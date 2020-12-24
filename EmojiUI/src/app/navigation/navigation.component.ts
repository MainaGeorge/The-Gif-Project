import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionsService} from '../services/questions.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Subscription} from 'rxjs';
import {GifService} from '../services/gif-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  jwtService = new JwtHelperService();
  isLoggedIn :boolean ;
  score: number = 0;
  hasLoggedInSubscription: Subscription;
  refreshScore: Subscription;
  constructor(private questionService: QuestionsService,
              private router:Router, private gifService:GifService) { }

  ngOnInit(): void {

    this.isLoggedIn = !this.jwtService.isTokenExpired(localStorage.getItem('token'));
    this.refreshScore = this.gifService.refreshScore.subscribe( ()=> {
      this.getScore();
    }, err => console.log(err))
    this.hasLoggedInSubscription = this.questionService.hasLoggedIn.subscribe( data => {
      this.isLoggedIn = data;
    });
  }

  onLogout(){
    this.questionService.logout().subscribe(
      () => {
        this.score = 0;
      },
        err => console.log(err));
    this.router.navigate(['/']).then( );
  }

  getScore(){
    this.score = +localStorage.getItem('score')
  }

  ngOnDestroy(): void {
    this.hasLoggedInSubscription.unsubscribe();
    this.refreshScore.unsubscribe();
  }


  onClick(subject: string) {
    // this.router.navigateByUrl("https://localhost:44388/api/questions/" + subject).then();
    this.router.navigate(['/questions'], {queryParams:{subject: subject}}).then();
  }
}
