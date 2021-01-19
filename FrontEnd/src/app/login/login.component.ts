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

    console.log(loginModel);
    this.accountService.login(loginModel).subscribe( (data) => {
      this.toastr.success("welcome " + data.username);
    }, (err) => {
      console.log(err);
    });
  }
}
