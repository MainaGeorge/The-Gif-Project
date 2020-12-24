import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {shuffleArray} from '../shared/methods';
import {GifArrays} from '../shared/gifArrays';


@Injectable({providedIn : 'root'})
export class GifService {
  gifArray: GifArrays;
  count: Subject<boolean> = new Subject<boolean>();
  refreshScore = new Subject<void> ();
  resetCounter = new Subject<void>();
  imagePath = new Subject<string>();
  loadNextQuestion = new Subject<void>();
  showCorrectAnswer = new Subject<true>();
  correctAnswer = new Subject<string>();
  increaseScore = new Subject<number>();
  gifImagesSuccess: string[];
  gifImagesOvation: string[];
  gifImagesFail: string[];
  gifImagesFailOvation: string[];
  gifPrepend = '../../assets/gifs/';
  failedGuesses = [];
  passedGuesses = [];


  constructor() {
    this.gifArray = new GifArrays();
    this.gifImagesFail = this.gifArray.gifImagesFail;
    this.gifImagesFailOvation = this.gifArray.gifImagesFailOvation;
    this.gifImagesSuccess = this.gifArray.gifImagesSuccess;
    this.gifImagesOvation = this.gifArray.gifImagesOvation;
  }

  getImagePath(type: string){
    let path = '';
    switch (type) {
      case 'fail':
        let indexLost = Math.floor(Math.random() * this.gifImagesFail.length);
        while(this.failedGuesses.includes(indexLost)){
          indexLost = Math.floor(Math.random() * this.gifImagesFail.length);
        }
        this.failedGuesses.push(indexLost);
        path = this.gifImagesFail[indexLost];
        break;
      case 'pass':
        let index = Math.floor(Math.random() * this.gifImagesSuccess.length);
        while(this.passedGuesses.includes(index)){
           index = Math.floor(Math.random() * this.gifImagesSuccess.length);
        }
        this.passedGuesses.push(index);
        path = this.gifImagesSuccess[index];
        break;
      case 'ovation':
        shuffleArray(this.gifImagesOvation);
        path = this.gifImagesOvation[Math.floor(Math.random() * this.gifImagesOvation.length)];
        break;
      case 'kaput':
        shuffleArray(this.gifImagesFailOvation);
        path = this.gifImagesFailOvation[Math.floor(Math.random() * this.gifImagesFailOvation.length)];
        break;
    }
    return this.gifPrepend + path;
  }

  pickNextQuestion(state:string, answer:string){
    if(state === 'fail'){
      this.correctAnswer.next(answer);
      this.showCorrectAnswer.next(true);
    }else if(state === 'pass') {
      this.increaseScore.next(10);
    }
    this.imagePath.next(this.getImagePath(state));
    this.count.next(true);
    setTimeout( ()=> {
      this.loadNextQuestion.next();
    }, 3300)

    }

  setScore(currentScore: number){
    const score = +localStorage.getItem('score');
    if(score <= currentScore){
      localStorage.setItem('score', currentScore.toString());
      this.refreshScore.next();
    }

  }

}
