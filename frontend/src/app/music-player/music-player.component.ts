import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PlayerService } from './player-service';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {


  
  message:string;

  public audio = new Audio();
  public currentlyPlaying : boolean = false;
  public songProgress = 0;

  constructor(private data: PlayerService) {
    this.data.currentMessage.subscribe(message => this.testMethod1(message))
   }

  testMethod1(id){
    console.log('TEST METHOD1. SONG FILE ID: '+  id)

    if(id!='default message'){
      this.loadAndPlay(id);
      this.currentlyPlaying = true;
    }

  }

  loadAndPlay(id){
    this.audio.src = "http://localhost:3000/api/file/download?objectID=" + id;
    this.audio.load();
    this.audio.play();
  }

  public pauseAudio(){
    this.audio.pause();
    this.currentlyPlaying = false;
  }

  public playAudio(){
    this.audio.play();
    this.currentlyPlaying = true;
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



  ngOnInit() {

    

    //og 10.152.216.39
    //mb 10.152.194.159

    // this.audio.src = "http://10.152.194.159:8080/api/file/download?objectID=5bd84d2e79f5a00350fc9e17";

    //savo id
    //wutang1
    this.audio.src = "http://localhost:3000/api/file/download?objectID=5beb267482409b11702639c6";




    this.audio.load();
    this.audio.volume = 0.8;
    // this.songTime = 100;
    // this.audio.currentTime = 15;
    this.progressBar();
  }

  // async getDuration(){    
  //   console.log('DURATION nuo ASYNC METODO')
  //   console.log(this.audio.duration);
  //   while(this.audio.duration === Infinity) {
  //     await new Promise(r => setTimeout(r, 1000));
  //     this.audio.currentTime = 10000000*Math.random();
  //   }
  //   let duration = this.audio.duration;

  //   console.log(duration);
  // } 

  public test1(){
    console.log("------------------------ test 1------------")
    console.log("current time: " + this.audio.currentTime);
    console.log("duration: " + this.audio.duration);
  }

  public test2(){
    this.audio.currentTime = 55;
    console.log(this.message);
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
      console.log(this.audio);
      console.log(this.audio.currentTime);
      console.log(this.songProgress);
      });
  }

  public onProgressSliderChange(){

  }

}
