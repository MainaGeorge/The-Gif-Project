import {Component, Input, OnInit} from '@angular/core';
import {GifService} from '../../services/gif-service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Input() score: number;
  notShowScore = false;
  constructor(private gifService: GifService) { }

  ngOnInit(): void {
    // this.gifService.increaseScore.subscribe(score => this.score = this.score + score, err => console.log(err));
  }

}
