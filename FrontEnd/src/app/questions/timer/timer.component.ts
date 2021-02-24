import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timeCounter: any;
  currentSecond: number;
  textColor = 'text-success';
  constructor() { }

  ngOnInit(): void {
    this.currentSecond = 10;
    this.setCounter();
  }

  setCounter(){
    this.timeCounter = setInterval( () => {
      if(this.currentSecond > 3){
        this.textColor = 'text-success';
      }else{
        this.textColor = 'text-danger';
      }

      if(this.currentSecond > 0){
        this.currentSecond--;
      }else{
        clearInterval(this.timeCounter);
      }
    }, 1000);
  }
}
