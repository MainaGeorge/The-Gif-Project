import {JwtHelperService} from '@auth0/angular-jwt';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountServiceService} from '../services/account-service.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthenticationGuard implements CanActivate{

  constructor(private accountService: AccountServiceService,private jwtService: JwtHelperService,
              private toastrService: ToastrService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.accountService.getToken();
    if(token === null) {
      this.router.navigate(['/login']).then( resolve => {
        this.toastrService.warning('you must be logged in to view that page');
      });
      return false;
    }

    else if(this.jwtService.isTokenExpired(token)){
      this.router.navigate(['/login']).then( resolve => {
        this.toastrService.warning('you must be logged in to view this page');
      });
      return false;
    }
    return true;
  }
}
