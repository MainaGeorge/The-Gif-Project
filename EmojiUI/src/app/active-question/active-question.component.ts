import {Component, OnDestroy, OnInit} from '@angular/core';
import {GifService} from '../services/gif-service';
import {Subscription} from 'rxjs';
import {QuestionsService} from '../services/questions.service';
import {Question} from '../shared/models';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-active-question',
  templateUrl: './active-question.component.html',
  styleUrls: ['./active-question.component.css']
})
export class ActiveQuestionComponent implements OnInit, OnDestroy {

  mySubscription: any;
  questions: Question[]
  currentQuestionIndex = 0;
  currentQuestion: Question;
  correctAnswer: string;
  imagePath : string;
  showCorrectAnswer = false;
  showQuestion = false;
  showQuestionSubscription: Subscription;
  imagePathSubscription: Subscription;
  showCorrectAnswerSubscription: Subscription;
  correctAnswerSubscription: Subscription;
  loadNextQuestion: Subscription;
  show=false;
  score: number = 0;
  showScore = false;
  constructor(private gifService: GifService, private questionsService: QuestionsService,
              private activatedRoute:ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.correctAnswerSubscription = this.gifService.correctAnswer.subscribe( data => this.correctAnswer = data, err => console.log(err));
    this.showQuestionSubscription = this.gifService.count.subscribe(
      data => {
        this.showQuestion = data;
        if(this.currentQuestionIndex < this.questions.length) {
          this.currentQuestionIndex++;
          this.currentQuestion = this.questions[this.currentQuestionIndex];
        } else if(this.currentQuestionIndex === this.questions.length){
          this.showScore = true;
        } else {
          this.gifService.count.next(true);
        }
      },
        err => console.log(err));
    this.imagePathSubscription = this.gifService.imagePath
      .subscribe( data => this.imagePath = data, err => console.log(err));
    this.showCorrectAnswerSubscription = this.gifService.showCorrectAnswer.subscribe(
      data => {
        this.show = true;
        this.showCorrectAnswer = data;
        setTimeout(()=> {
          this.show = false;
        }, 3000)
      }, err => console.log(err));

    this.questions = this.activatedRoute.snapshot.data['questions'];
    this.currentQuestion = this.questions[this.currentQuestionIndex];

    this.gifService.increaseScore.subscribe(score => this.score = this.score + score, err => console.log(err));
    this.loadNextQuestion = this.gifService.loadNextQuestion.subscribe(() => this.showQuestion = false, err => console.log(err));
  }

  ngOnDestroy(): void {
    this.showQuestionSubscription.unsubscribe();
    this.imagePathSubscription.unsubscribe();
    this.showCorrectAnswerSubscription.unsubscribe();
    this.correctAnswerSubscription.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
