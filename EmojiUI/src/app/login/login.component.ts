import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionsService} from '../services/questions.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private router: Router;

  constructor(private activatedRoute: ActivatedRoute,
              private questionService: QuestionsService,
              router:Router,
              private toastr: ToastrService) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    const user = loginForm.value;
    this.questionService.login(user).subscribe( data => {
      localStorage.setItem('token', data['token']);
      localStorage.setItem('score', data['score']);
      localStorage.setItem('email', data['email']);
      this.toastr.success('you have successfully logged in');
      this.questionService.hasLoggedIn.next(true);
      this.router.navigate(['/questions']).then()
    })
  }
}
