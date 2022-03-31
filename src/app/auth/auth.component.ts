import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  userLoggedIn = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router){}

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
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }
}
