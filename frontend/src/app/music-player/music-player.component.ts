import { Component, OnInit, SimpleChanges } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {

  public audio = new Audio();
  public currentlyPlaying : boolean = false;
  public isMuted : boolean = false;
  public songProgress = 0;
  public volume = 0;
  public currentTime : string = "0.00";
  public remainingTime : string = "0.00";
  constructor() { }

  ngOnInit() {

    

    //og 10.152.216.39
    //mb 10.152.194.159

    // this.audio.src = "http://10.152.194.159:8080/api/file/download?objectID=5bd84d2e79f5a00350fc9e17";

    //savo id
    //wutang1
    // this.audio.src = "http://10.152.216.39:3000/api/file/download?objectID=5bd84d2e79f5a00350fc9e17";
    this.audio.src = "http://localhost:3000/api/file/download?objectID=5be9bf6553ac8a0ba840b30b";

    


    // this.audio.src = "http://10.152.216.39:3000/api/file/download?objectID=5bd877fe9f7ae81eb08faa2c";
        // this.audio.src = "http://10.152.216.39:3000/api/file/download?objectID=5bd877fe9f7ae81eb08faa2c";


    //waves
    // this.audio.src = "http://localhost:3000/api/file/download?objectID=5bd8915c0d90120948e5500f";
    
    //kendrick
    // this.audio.src = "http://localhost:3000/api/file/download?objectID=5bd9cb14103dde1c24fb07ab";
    



    this.audio.load();
    // this.volumeBar = 50;
    this.progressBar();
    this.volume = 52;
    this.audio.volume = 0.52;
    // this.volumeBar();
  }

  // async getDuration(){    
  //   while(this.audio.duration === Infinity) {
  //     await new Promise(r => setTimeout(r, 1000));
  //     this.audio.currentTime = 10000000*Math.random();
  //   }
  //   let duration = this.audio.duration;

  //   console.log(duration);
  // } 

  public pressedButton(){
    if(this.currentlyPlaying){
      this.pauseAudio();
    }
    else{
      this.playAudio();
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
      return mins.toFixed(0) + ".0" +  secs.toFixed(0);
    } else {
      return mins.toFixed(0) + "." +  secs.toFixed(0);
    }
  }

  public timerUpdate(duration, currT){
    let difference = (duration - currT);
    this.remainingTime = this.convertDecimalToTime(difference);
    this.currentTime = this.convertDecimalToTime(currT);
  }

  public changeProgress(event: any){
    this.audio.currentTime = this.changedProgressCount(this.audio.duration, event.value);
  }

  public progressBar(){
    try{
      this.audio.addEventListener("timeupdate", (currentTime)=>{
        this.songProgress = this.progressCount(this.audio.duration, this.audio.currentTime);
        this.timerUpdate(this.audio.duration, this.audio.currentTime);
      });
    }
    catch(error){
      console.log(error);
    }
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
