import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Answer, Question, User} from '../shared/models';
import {Observable, Subject} from 'rxjs';


@Injectable({providedIn : 'root'})
export class QuestionsService {
  hasLoggedIn = new Subject<boolean>();
  baseQuestionsUrl = 'https://localhost:44388/api/questions/';
  registerUrl = 'https://localhost:44388/api/account/register';
  loginUrl = 'https://localhost:44388/api/account/login';
  logoutUrl = 'https://localhost:44388/api/account/logout';

  constructor( private http: HttpClient) {
  }

  getQuestions(subject: string): Observable<Question[]>{
    return this.http.get<Question[]>(this.baseQuestionsUrl + subject);
  }

  getSubjects(){
    return this.http.get<string[]>(this.baseQuestionsUrl + 'all/subjects');
  }

  register(registrationData: any){
    return this.http.post(this.registerUrl, registrationData);
  }

  login(user: User){
    return this.http.post<string>(this.loginUrl, user);
  }

  logout(){
    localStorage.removeItem('token');
    this.hasLoggedIn.next(false);
    return this.http.post(this.logoutUrl, {});
  }

  addQuestion(question){
    return this.http.post(this.baseQuestionsUrl, question);
  }
}
