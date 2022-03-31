import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  userLoggedIn = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective;

  constructor(private authService: AuthService,
              private router: Router,
              private cfr: ComponentFactoryResolver){}

  onSwitchMode(){
    this.userLoggedIn = !this.userLoggedIn;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const pw = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.userLoggedIn) {
      authObs = this.authService.login(email,pw);
    } else {
      authObs = this.authService.signup(email, pw);
    }

    authObs.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    });

    form.reset();
  }

  private showErrorAlert(error: string){
    const alertComponentFactory = this.cfr.resolveComponentFactory(AlertComponent);
    const hostVcr = this.alertHost.vcr;
    hostVcr.clear();

    const compRef = hostVcr.createComponent(alertComponentFactory);

    compRef.instance.message = error;
    this.closeSub = compRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostVcr.clear();
    });

  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
      if (this.closeSub){
        this.closeSub.unsubscribe();
      }
  }
}
