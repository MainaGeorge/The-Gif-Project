import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionsService} from '../services/questions.service';
import {Question} from '../shared/models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  topics: string[];
  defaultNone = 'None of the above';
  defaultAll = 'All of the above';

  constructor(private questionService:QuestionsService,
              private router: Router) { }

  ngOnInit(): void {
    this.questionService.getSubjects().subscribe( (data) => this.topics = data , err => console.log(err));
  }

  onSubmit(form: NgForm) {
    const question:Question = {
      answer: {
        correctAnswer: form.value['correctAnswer'],
        firstAlternative: form.value['firstAlternative'],
        secondAlternative: this.defaultAll,
        thirdAlternative: this.defaultNone
      }, description: form.value['description'], subject: form.value['subject'],
      photos: []
    }
  this.questionService.addQuestion(question).subscribe( data => console.log(data), err => console.log(err));
    this.router.navigate(['/questions'], {queryParams: {subject: 'general'}}).then()
  }
}
