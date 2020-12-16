import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GifService} from '../../services/gif-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() correctAnswer: string;
  resetCounterSubscription: Subscription;
  counter: number;
  timeout: any;
  textColor: string;
  constructor(private gifService: GifService) { }

  ngOnInit(): void {
    this.counter = 9;
    this.resetCounterSubscription = this.gifService.resetCounter.subscribe(() => clearInterval(this.timeout), err => console.log(err));
    this.setCounter();
  }

  setCounter(){
    this.timeout = setInterval( () => {
      if(this.counter > 2){
        this.textColor = 'text-success';
      }else {
        this.textColor = 'text-danger';
      }
      if (this.counter > 0){
        this.counter--;
      }else {
        this.gifService.pickNextQuestion('fail', this.correctAnswer);
        clearInterval(this.timeout);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeout);
    this.resetCounterSubscription.unsubscribe();
  }
}
