import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../interfaces/models';

@Component({
  selector: 'app-active-question',
  templateUrl: './active-question.component.html',
  styleUrls: ['./active-question.component.css']
})
export class ActiveQuestionComponent implements OnInit {

  @Input() Questions: Question[];
  question: Question;
  constructor() { }

  ngOnInit(): void {
    this.question = this.Questions[2];
  }

}
