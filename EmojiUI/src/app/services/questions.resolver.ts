import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Question} from '../shared/models';
import {Observable, throwError} from 'rxjs';
import {QuestionsService} from './questions.service';
import {catchError} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class QuestionsResolver implements Resolve<Question[]> {
  constructor(private questionsService: QuestionsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Question[]> | Promise<Question[]> | Question[] {
    const subject = route.queryParams['subject'] ?? 'general';
    return this.questionsService.getQuestions(subject).pipe(catchError(err => throwError(err)));
  }

}
