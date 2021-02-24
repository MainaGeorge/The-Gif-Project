import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AppUser, LoginModel, RegistrationModel} from '../interfaces/models';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  loginUrl = 'https://localhost:44388/api/account/login';
  registrationUrl = 'https://localhost:44388/api/account/register';
  logoutUrl = 'https://localhost:44388/api/account/logout';
  hasLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private jwtService: JwtHelperService) { }

  login(model: LoginModel): Observable<AppUser>{
    return this.http.post<AppUser>(this.loginUrl, model);
  }

  register(model: RegistrationModel): Observable<AppUser>{
    return this.http.post<AppUser>(this.registrationUrl, model);
  }

  logout(){
    return this.http.post(this.logoutUrl, {});
  }

  isLoggedIn(): boolean{
    const token = this.getToken();
    if(token)
      return !this.jwtService.isTokenExpired(token);
    return false;
  }

  getToken(): string {
    const user = localStorage.getItem('user');
    if(!user) return null;

    const userApp:AppUser = JSON.parse(user);
    return userApp.token;
  }
}
