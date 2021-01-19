import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from '../interfaces/models';
import {Injectable} from '@angular/core';
import {AccountServiceService} from '../services/account-service.service';

@Injectable()
export class AuthenticationGuard implements CanActivate{

  constructor(private accountService: AccountServiceService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.accountService.isLoggedIn();
  }
}
