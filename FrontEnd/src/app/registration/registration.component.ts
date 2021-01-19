import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AccountServiceService} from '../services/account-service.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private accountService: AccountServiceService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.accountService.register(form.value).subscribe( (data)=> {
      this.router.navigate(['/login']).then( () => {
        this.toastr.success('please log into the app ' + data.username);
      } , () => {
        this.toastr.error('Something went wrong while registering or redirecting')
      } )
    }, (err) => {
        this.toastr.error("Could not register user");
    })
  }
}
