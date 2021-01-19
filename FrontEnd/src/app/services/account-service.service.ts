import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AppUser, LoginModel, RegistrationModel} from '../interfaces/models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  loginUrl = 'https://localhost:44388/api/account/login';
  registrationUrl = 'https://localhost:44388/api/account/register';

  constructor(private http: HttpClient, private jwtService: JwtHelperService) { }

  login(model: LoginModel): Observable<AppUser>{
    return this.http.post<AppUser>(this.loginUrl, model);
  }

  register(model: RegistrationModel): Observable<AppUser>{
    return this.http.post<AppUser>(this.registrationUrl, model);
  }

  isLoggedIn(): boolean{
    const user = localStorage.getItem('user');
    if(!user) return false;

    const userApp:AppUser = JSON.parse('user');
    return !this.jwtService.isTokenExpired(userApp.token);
  }
}
