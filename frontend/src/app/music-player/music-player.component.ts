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
  public isMuted : boolean = false;
  public songProgress = 0;

  public volume = 0;
  public currentTime : string = "0.00";
  public remainingTime : string = "0.00";


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
    }
    else{
      this.playAudio();
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
    this.volume = 52;
    this.audio.volume = 0.52;
    // this.volumeBar();
  }

  public progressCount(duration, currTime){
    return (currTime  / duration) * 1000;
  }

  public changedProgressCount(duration, progress){
    return (progress * duration) / 1000;
  }

  public convertDecimalToTime(decTime){
    let constant = 1.666666666666667;
    let mins = ( decTime  / 60 )
    let secs = ( ( ( decTime ) / 60 % 1 / constant ) * 100);
    console.log("secs " + secs);
    console.log("mins " + mins);
    if(secs < 10){
      console.log( this.getFlooredFixed(mins, 0) + ":0" +  this.getFlooredFixed(secs, 0));
      return this.getFlooredFixed(mins, 0) + ":0" +  this.getFlooredFixed(secs, 0);
    } else {
      console.log( this.getFlooredFixed(mins, 0) + ":" +  this.getFlooredFixed(secs, 0));
      return this.getFlooredFixed(mins, 0) + ":" +  this.getFlooredFixed(secs, 0);
    }
  }

  public getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  public timerUpdate(duration, currT){
    let difference = (duration - currT);
    this.remainingTime = this.convertDecimalToTime(difference);
    this.currentTime = this.convertDecimalToTime(currT);
    console.log("remaining time "+this.remainingTime);
    console.log("current time "+this.currentTime);
  }

  public changeProgress(event: any){
    this.audio.currentTime = this.changedProgressCount(this.audio.duration, event.value);
  }

  public progressBar(){
    this.audio.addEventListener("timeupdate", (currentTime)=>{
      // if(this.songProgress != this.progressCount(this.audio.duration, this.audio.currentTime)){
      //   console.log("TRIGgEEEREDEDE")
      // }
      this.songProgress = this.progressCount(this.audio.duration, this.audio.currentTime);
      this.timerUpdate(this.audio.duration, this.audio.currentTime);
      // console.log('progress bar:-----------------------')
      // console.log("this.audio "+this.audio);
      // console.log("this.audio.currentTime "+this.audio.currentTime);
      // console.log("this.songProgress "+this.songProgress);
      // console.log("this.audio.duration"+this.audio.duration);
      });
    }
    catch(error){
      console.log(error);
    }
  

    public changeVolume(event: any){
      this.audio.volume = event.value / 100;
      this.volumeIconChange();
    }
  
    public volumeIconChange(){
      if(this.audio.volume > 0){
        this.isMuted = false;
      } 
      else { 
        this.isMuted = true
      };
    }
  
    public mute(){
      if(this.isMuted){
        this.isMuted = false;
        this.audio.volume = this.volume / 100;
      }
      else {
        this.isMuted = true;
        this.audio.volume = 0;
      }
    }



}
