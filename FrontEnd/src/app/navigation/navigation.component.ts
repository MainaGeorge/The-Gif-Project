import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountServiceService} from '../services/account-service.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  hasLoggedIn: Subscription;
  constructor(private accountService: AccountServiceService,
              private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.accountService.isLoggedIn();
    this.hasLoggedIn = this.accountService.hasLoggedIn.subscribe( data => this.isLoggedIn = data)
  }

  logout() {
    this.accountService.logout().subscribe( () => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']).then( resolve => {
        this.accountService.hasLoggedIn.next(false);
        this.toastrService.success('successfully logged out');
      })
    });
  }

  ngOnDestroy(): void {
    this.hasLoggedIn.unsubscribe();
  }
}
