import {Component, Input, OnInit} from '@angular/core';
import {QuestionsService} from '../../services/questions.service';
import {Answer, Question} from '../../shared/models';
import {GifService} from '../../services/gif-service';
import {shuffleArray} from '../../shared/methods';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  answer: Answer;
  ansArr: string[] = [];
  colours = ['primary', 'danger', 'success', 'warning', 'secondary'];
  color: string;
  constructor(private questService: QuestionsService,
              private gifService: GifService) { }

  ngOnInit(): void {
    this.answer = this.question.answer;
    this.fillArray(this.answer);
    this.color = this.selectColor();
  }

  onSubmit(collectedAnswer: string) {
    if(collectedAnswer === this.answer.correctAnswer){
      this.gifService.pickNextQuestion('pass', this.answer.correctAnswer);
    } else {
      this.gifService.pickNextQuestion('fail', this.answer.correctAnswer);
    }
    this.gifService.resetCounter.next();
  }

  fillArray(answer: Answer){
    this.ansArr.push(answer.correctAnswer);
    this.ansArr.push(answer.firstAlternative);
    this.ansArr.push(answer.secondAlternative);
    this.ansArr.push(answer.thirdAlternative);
    this.ansArr.push('Skip this question');

    shuffleArray(this.ansArr)
  }

  selectColor() {
    return this.colours[Math.floor(Math.random() * this.colours.length)];
  }
}
