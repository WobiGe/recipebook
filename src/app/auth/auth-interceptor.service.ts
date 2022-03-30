import { Injectable } from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http'
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //user authentication through interceptor
    //adds user token to all outgoing requests
    return this.authService.user.pipe(
      take(1),
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