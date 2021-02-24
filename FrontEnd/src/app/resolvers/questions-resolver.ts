import {Injectable} from '@angular/core';
import {QuestionServiceService} from '../services/question-service.service';
import {Question} from '../interfaces/models';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class QuestionsResolver  implements  Resolve<Question[]>{

  constructor(private questions: QuestionServiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
    return this.questions.getQuestions('General Knowledge').pipe(catchError(err => throwError(err)));
  }
}
