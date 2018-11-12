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

    

    //og 10.152.216.39
    //mb 10.152.194.159

    // this.audio.src = "http://10.152.194.159:8080/api/file/download?objectID=5bd84d2e79f5a00350fc9e17";

    //savo id
    //wutang1
    // this.audio.src = "http://10.152.216.39:3000/api/file/download?objectID=5bd84d2e79f5a00350fc9e17";
    this.audio.src = "http://localhost:3000/api/file/download?objectID=5be876eea59bd714b8125db2";

    


    // this.audio.src = "http://10.152.216.39:3000/api/file/download?objectID=5bd877fe9f7ae81eb08faa2c";
        // this.audio.src = "http://10.152.216.39:3000/api/file/download?objectID=5bd877fe9f7ae81eb08faa2c";


    //waves
    // this.audio.src = "http://localhost:3000/api/file/download?objectID=5bd8915c0d90120948e5500f";
    
    //kendrick
    // this.audio.src = "http://localhost:3000/api/file/download?objectID=5bd9cb14103dde1c24fb07ab";
    



    this.audio.load();
    this.audio.volume = 0.2;
    // this.songTime = 100;
    this.audio.currentTime = 15;
    this.progressBar();
  }

  async getDuration(){    
    console.log('DURATION nuo ASYNC METODO')
    console.log(this.audio.duration);
    while(this.audio.duration === Infinity) {
      await new Promise(r => setTimeout(r, 1000));
      this.audio.currentTime = 10000000*Math.random();
    }
    let duration = this.audio.duration;

    console.log(duration);
  } 

  public test1(){
    console.log("------------------------ test 1------------")
    console.log("current time: " + this.audio.currentTime);
    console.log("duration: " + this.audio.duration);
  }

  public test2(){
    this.audio.currentTime = 172;
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
