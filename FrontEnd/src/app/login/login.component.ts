import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountServiceService} from '../services/account-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountServiceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    const loginModel = loginForm.value;
    this.accountService.login(loginModel).subscribe( (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.accountService.hasLoggedIn.next(true);
      this.toastr.success("welcome " + data.username);
    }, (err) => {
      this.toastr.error(err.error);
    });
  }
}
