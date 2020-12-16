import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GifImagesComponent } from './active-question/gif-images/gif-images.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ActiveQuestionComponent } from './active-question/active-question.component';
import { TimerComponent } from './active-question/timer/timer.component';
import { QuestionComponent } from './active-question/question/question.component';
import { ScoreComponent } from './active-question/score/score.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {QuestionsResolver} from './services/questions.resolver';
import {RegistrationComponent} from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AddHeaderInterceptorProvider} from './services/request-modifying.service';
import { AddQuestionsComponent } from './add-questions/add-questions.component';


const routes :Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'questions', component: ActiveQuestionComponent, resolve: {
      questions : QuestionsResolver}, runGuardsAndResolvers: 'always'},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-question', component: AddQuestionsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
                ];
@NgModule({
  declarations: [
    AppComponent,
    GifImagesComponent,
    NavigationComponent,
    ActiveQuestionComponent,
    TimerComponent,
    QuestionComponent,
    ScoreComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AddQuestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes,{
      onSameUrlNavigation: 'reload'}),
  ],
  providers: [QuestionsResolver, AddHeaderInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
