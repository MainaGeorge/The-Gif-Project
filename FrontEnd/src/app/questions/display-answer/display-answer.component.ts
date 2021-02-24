import {Component, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../interfaces/models';
import {shuffle} from '../../interfaces/common-functions';

@Component({
  selector: 'app-display-answer',
  templateUrl: './display-answer.component.html',
  styleUrls: ['./display-answer.component.css']
})
export class DisplayAnswerComponent implements OnInit {

  @Input() answer: Answer;
  @Output() selectedAnswer: string;
  answerStringArray: string[];
  constructor() { }

  ngOnInit(): void {
    this.answerStringArray = [this.answer.correctAnswer, this.answer.thirdAlternative, this.answer.secondAlternative, this.answer.firstAlternative];
    this.answerStringArray = shuffle(this.answerStringArray);
  }

  onSelectAnswer(each: string) {
    this.selectedAnswer = each;
  }
}
