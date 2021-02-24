import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionsService} from '../services/questions.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private questionService:QuestionsService,
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
      let registrationData = form.value;
      this.questionService.register(registrationData).subscribe( data =>{
        const message = "successful registration." + '\n' + "Log in to use the app"
        this.toastr.success(message);
        this.router.navigate(['/login']).then();
      }, err => console.log(err));
  }
}
