import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  baseQuestionsUrl = 'https://localhost:44388/api/questions/';
  constructor(private http: HttpClient) { }

  getSubjects(){
    return this.http.get<string[]>(this.baseQuestionsUrl + 'all/subjects');
  }

  getQuestions(subject: string): Observable<Question[]>{
    return this.http.get<Question[]>(this.baseQuestionsUrl + subject);
  }
}
