import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionsService} from '../services/questions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private questionService:QuestionsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
      let registrationData = form.value;
      this.questionService.register(registrationData).subscribe( data =>{
        this.router.navigate(['/login']).then();
      }, err => console.log(err));
  }
}
