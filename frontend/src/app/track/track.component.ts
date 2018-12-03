import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Track } from './track';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  // @Input() trackToDisplay: Track;

  @Output() onClickPlay = new EventEmitter<Track>();

  // trackInfo: Track;

  songs: any;
  audio:any;

  constructor(private api: ApiService) {
  // this.data.currentMessage.subscribe(message => this.trackInfo = message)
  }

  // newMessage($event) {

  //   console.log('new message: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //   console.log($event);
  //   //this.artistImage = 'http://localhost:3000/api/file/download/picture?objectID=' + $event.album.artist.artist_picture;
  //   // this.musicPlayerImage = "http://localhost:3000/api/file/download/picture?objectID=" + trackInfo.album.album_cover;

  //   this.data.sendTrackEvent($event);
  //   console.log('THIS TRACK INFO: ')
  //   console.log(this.trackInfo)

  // }

  ngOnInit() {
    // console.log(this.trackToDisplay);
    console.log("GETTING ALL SONGS (ngOnInit)")
    this.api.getSongs()
      .subscribe(res => {
        console.log(res);
        this.songs = res;
      }, err => {
        console.log(err);
      });
  }

  clickedPlay(track: Track){
    // console.log(track);
    this.onClickPlay.emit(track);
  }

}

// export class SongDataSource extends DataSource<any> {
//   constructor(private api: ApiService) {
//     super()
//   }
//   connect() {
//     console.log('songdatasource connect.')

//     return this.api.getSongs();
//   }
//   disconnect() {
//   }
// }