import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionsService} from '../services/questions.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  jwtService = new JwtHelperService();
  isLoggedIn :boolean ;
  hasLoggedInSubscription: Subscription;
  constructor(private questionService: QuestionsService,
              private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !this.jwtService.isTokenExpired(localStorage.getItem('token'));
    this.hasLoggedInSubscription = this.questionService.hasLoggedIn.subscribe( data => {
      this.isLoggedIn = data;
    });
  }

  onLogout(){
    this.questionService.logout().subscribe( () => console.log("logged out"), err => console.log(err));
    this.router.navigate(['/']).then( );
  }

  ngOnDestroy(): void {
    this.hasLoggedInSubscription.unsubscribe();
  }


  onClick(subject: string) {
    // this.router.navigateByUrl("https://localhost:44388/api/questions/" + subject).then();
    this.router.navigate(['/questions'], {queryParams:{subject: subject}}).then();
  }
}
