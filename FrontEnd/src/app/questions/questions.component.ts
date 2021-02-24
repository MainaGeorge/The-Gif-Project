import { Component, OnInit } from '@angular/core';
import {QuestionServiceService} from '../services/question-service.service';
import {Question} from '../interfaces/models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  showInterface = false;
  subjects: string[];
  questions: Question[]
  constructor(private questionService: QuestionServiceService,
              private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
    this.questionService.getSubjects().subscribe( (subjects) => {
      this.subjects = subjects;
      this.showInterface = true;
    }, err => console.log(err));

    this.questions = this.activatedRoute.snapshot.data['questions'];
  }

  getQuestions(subject: string) {
    this.showInterface  = false;
    this.questionService.getQuestions(subject).subscribe( questions => {
      this.questions = questions;
      this.showInterface = true;
      console.log(questions);
    }, err => console.log(err))
  }
}
