import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from '../interfaces/models';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate{

  constructor(private jwtService: JwtHelperService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user');
    if(!user){
      return false;
    }
    const appUser: AppUser = JSON.parse(user);
    const token = appUser.token;

    return !this.jwtService.isTokenExpired(token);
  }
}
