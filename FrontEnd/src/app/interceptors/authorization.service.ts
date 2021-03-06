import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppUser} from '../interfaces/models';
import {AccountServiceService} from '../services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{

  constructor(private jwtService: JwtHelperService, private accountService: AccountServiceService) { }

  getToken(user: string){
    const userDetails: AppUser = JSON.parse(user);
    return userDetails.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('account')){
      return next.handle(req);
    }else{
      const token = this.accountService.getToken();
      if (token && !this.jwtService.isTokenExpired(token)) {
        const newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(newReq);
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
