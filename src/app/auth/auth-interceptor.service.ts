import { Injectable } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http'
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //user authentication through interceptor
    //adds user token to all outgoing requests
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      //combine observables and overwrite the first one
      exhaustMap(user => {
        if (!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq);
      }));
  }

}
