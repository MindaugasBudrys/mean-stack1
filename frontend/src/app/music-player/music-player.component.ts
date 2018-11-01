import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  public audio = new Audio();
  public currentlyPlaying : boolean = false;
  public songProgress = 0;

  constructor() { }

  ngOnInit() {
    // this.audio.src = "http://localhost:3000/api/file/download?objectID=5bd8915c0d90120948e5500f";
    //savo id
    this.audio.src = "http://localhost:3000/api/file/download?objectID=5bd9cb14103dde1c24fb07ab";
    
    this.audio.load();
    this.audio.volume = 0.2;
    // this.songTime = 100;
    this.audio.currentTime = 20;
    this.progressBar();
  }

  public pressedButton(){
    if(this.currentlyPlaying){
      this.pauseAudio();
      console.log("should be paused now.")
      console.log(this.audio.currentTime);   
      console.log(this.audio.duration);
    }
    else{
      this.playAudio();
      console.log("should start playing now.")
      console.log(this.audio.currentTime);
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

  public progressCount(duration, currTime){
    console.log(duration);
    return (currTime  / duration) * 100;
  }

  public changedProgressCount(duration, progress){
    return (progress * duration) / 100;
  }

  public changeProgress(event: any){
    console.log(event.value);
    this.audio.currentTime = this.changedProgressCount(this.audio.duration, event.value);
  }

  public progressBar(){
    this.audio.addEventListener("timeupdate", (currentTime)=>{
      // if(this.songProgress != this.progressCount(this.audio.duration, this.audio.currentTime)){
      //   console.log("TRIGgEEEREDEDE")
      // }
      this.songProgress = this.progressCount(this.audio.duration, this.audio.currentTime);
      console.log('progress bar:-----------------------')
      console.log(this.audio.duration);
      console.log(this.audio.currentTime);
      console.log(this.songProgress);
      });
  }

  public onProgressSliderChange(){

  }

}
