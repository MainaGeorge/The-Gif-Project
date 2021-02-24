import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthorizationInterceptor} from './interceptors/authorization.service';
import {AuthenticationGuard} from './Guards/authentication.guard';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {AppUser} from './interfaces/models';
import { QuestionsComponent } from './questions/questions.component';
import { ActiveQuestionComponent } from './questions/active-question/active-question.component';
import { TimerComponent } from './questions/timer/timer.component';
import { ScoreComponent } from './questions/score/score.component';
import { DisplayAnswerComponent } from './questions/display-answer/display-answer.component';

export function tokenGetter() {
  const user = localStorage.getItem('user');
  if(!user) return '';
  const appUser: AppUser = JSON.parse(user);
  return appUser.token;
}
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    QuestionsComponent,
    ActiveQuestionComponent,
    TimerComponent,
    ScoreComponent,
    DisplayAnswerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [AuthorizationInterceptor, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
