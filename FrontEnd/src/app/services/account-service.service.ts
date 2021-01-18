import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginModel} from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  constructor(private http: HttpClient, private jwtService: JwtHelperService) { }

  login(model: LoginModel){

  }

  register(){

  }
}
