import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  public audio = new Audio();
  public currentlyPlaying : boolean = false;

  constructor() { }

  ngOnInit() {
    this.audio.src = "http://localhost:3000/api/file/download?filename=wutang1.mp3";
    this.audio.load();
    this.audio.volume = 0.2;
  }

  public pressedButton(){
    if(this.currentlyPlaying){
      this.pauseAudio();
      console.log("should be paused now.")

    }
    else{
      this.playAudio();
      console.log("should start playing now.")
    }
  }

  public pauseAudio(){
    this.audio.pause();
    this.currentlyPlaying = false;
  }

  public playAudio(){

    this.audio.play();
    this.currentlyPlaying = true;

  }
}
