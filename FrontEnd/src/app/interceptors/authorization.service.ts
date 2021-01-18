import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppUser} from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{

  constructor(private jwtService: JwtHelperService) { }

  getToken(user: string){
    const userDetails: AppUser = JSON.parse(user);
    return userDetails.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('account')){
      return next.handle(req);
    }else{
      const user = localStorage.getItem('user');
      if(user){
        const token = this.getToken(user);
        if (token && !this.jwtService.isTokenExpired(token)) {
          const newReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(newReq);
        }

      }
      return next.handle(req);
    }
  }
}

export const AuthorizationInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthorizationService,
  multi: true
}
