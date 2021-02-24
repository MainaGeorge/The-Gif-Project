import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Question, User} from '../shared/models';
import {Observable, of, Subject, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';


@Injectable({providedIn : 'root'})
export class QuestionsService {
  hasLoggedIn = new Subject<boolean>();
  baseQuestionsUrl = 'https://localhost:44388/api/questions/';
  registerUrl = 'https://localhost:44388/api/account/register';
  loginUrl = 'https://localhost:44388/api/account/login';
  logoutUrl = 'https://localhost:44388/api/account/logout';

  constructor( private http: HttpClient, private toastr: ToastrService) {
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
    localStorage.removeItem('score');
    localStorage.removeItem('email');
    this.hasLoggedIn.next(false);
    return this.http.post(this.logoutUrl, {});
  }

  addQuestion(question){
    return this.http.post(this.baseQuestionsUrl, question);
  }

  handleError(responseError:HttpErrorResponse){
    this.toastr.error("wrong");
    return throwError(responseError);
  }
}
