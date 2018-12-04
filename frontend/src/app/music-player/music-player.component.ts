import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PlayerService } from './player-service';
import { Track } from '../track/track'

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  message:string;

  //we can set this to a default image before starting to play something
  musicPlayerImage:string = '';

  public audio = new Audio();
  public currentlyPlaying : boolean = false;
  public isMuted : boolean = false;
  public songProgress = 0;

  public volume = 0;
  public currentTime : string = "0.00";
  public fullTime : string = "0.00";

  currentTrack: Track = null;


  constructor(private data: PlayerService) {
    this.data.currentMessage.subscribe(message => this.testMethod1(message))
   }

  testMethod1(trackInfo){
    console.log('TEST METHOD1. SONG FILE ID: ')
    console.log(trackInfo)


    if(trackInfo!='default message'){
      this.currentTrack = trackInfo;
      this.loadAndPlay(trackInfo.song_file);
 
      // getting album cover by id
      this.musicPlayerImage = "http://localhost:3000/api/file/download/picture?objectID=" + trackInfo.album.album_cover;
      // this.artistImage = 'http://localhost:3000/api/file/download/picture?objectID=' + trackInfo.album.artist.artist_picture;
      console.log('API LINK: ');
      console.log(this.musicPlayerImage);
      
      this.currentlyPlaying = true;
    }
  }

  loadAndPlay(id){
    this.audio.src = "http://localhost:3000/api/file/download?objectID=" + id;
    this.audio.load();
    this.playAudio();
    console.log(this.audio.duration);
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

    // this.currentTrack = new Track();
    // console.log('THIS TRACK NEW...')

    // //og 10.152.216.39
    // //mb 10.152.194.159

    // // this.audio.src = "http://10.152.194.159:8080/api/file/download?objectID=5bd84d2e79f5a00350fc9e17";

    // this.audio.src = "http://localhost:3000/api/file/download?objectID=5beb267482409b11702639c6";
    // this.audio.load();
    // this.audio.volume = 0.8;
    // this.progressBar();
    // this.volume = 52;
    // this.audio.volume = 0.52;
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
    if(secs < 10){
      return this.getFlooredFixed(mins, 0) + ":0" +  this.getFlooredFixed(secs, 0);
    } else {
      return this.getFlooredFixed(mins, 0) + ":" +  this.getFlooredFixed(secs, 0);
    }
  }

  public getFlooredFixed(v, d) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  public timerUpdate(duration, currT){
    this.fullTime = this.convertDecimalToTime(duration);
    this.currentTime = this.convertDecimalToTime(currT);
  }

  public changeProgress(event: any){
    this.audio.currentTime = this.changedProgressCount(this.audio.duration, event.value);
  }

  public progressBar(){
    this.audio.addEventListener("timeupdate", (currentTime)=>{
      this.songProgress = this.progressCount(this.audio.duration, this.audio.currentTime);
      this.timerUpdate(this.audio.duration, this.audio.currentTime);
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
