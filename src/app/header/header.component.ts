import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = true;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user; //!user ? false: true;
        console.log(!user);
        console.log(!!user);
      });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
