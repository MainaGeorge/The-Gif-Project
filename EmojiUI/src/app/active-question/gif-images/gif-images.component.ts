import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-gif-images',
  templateUrl: './gif-images.component.html',
  styleUrls: ['./gif-images.component.css']
})
export class GifImagesComponent implements OnInit, OnDestroy {

  @Input() imagePath: string;
  show = true;
  timeout;
  constructor() { }

  ngOnInit(): void {
    this.displayGif();
  }

  displayGif(){
    this.timeout = setTimeout(() => {
      this.show = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

}
