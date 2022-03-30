import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

//Firebase Response Format
export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
  user = new BehaviorSubject<User>(null);
  private tokenExpirationtimer: any;

  constructor(private http: HttpClient, private router: Router){}

  signup(email: string, pw: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDL1RWRzT5Qq082jTCaDi8iX7ik6YnfPvc',
      {
        email: email,
        password: pw,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId,resData.idToken, +resData.expiresIn);
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDL1RWRzT5Qq082jTCaDi8iX7ik6YnfPvc',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId,resData.idToken, +resData.expiresIn);
      }));
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationtimer){
      clearTimeout(this.tokenExpirationtimer);
    }
    this.tokenExpirationtimer = null;
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration);
   this.tokenExpirationtimer = setTimeout(()=>{
      this.logout();
    },expirationDuration)
  }

  autoLogin(){
    //dont lose user login on page reload
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      );

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime(); //calculate rest time
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(email: string, userId: string, token:string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000); //milliseconds * 1000 = seconds
      localStorage.setItem('userData', JSON.stringify(user)); //store user data in browsers local storage
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMsg = "An unknown error occured";
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMsg);
    }
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMsg = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'This password is not correct';
        break;
    }
    return throwError(errorMsg);
  }
}
