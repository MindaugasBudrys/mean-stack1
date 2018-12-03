import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PlayerService} from '../music-player/player-service';
import { Track } from '../track/track';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  // @Output() songPlayOnClick = new EventEmitter();
  // public inputToChild: Object;

  trackInfo: Track;

  songs: any;
  audio:any;

  artistImage:string = '';


  // displayedColumns = ['song_title', 'album_name', 'track_number', 'artist_name', 'published_year'];
  // dataSource = new SongDataSource(this.api);

  constructor(private api: ApiService,
              private data: PlayerService) {
    this.data.currentMessage.subscribe(message => this.trackInfo = message)
  }

  newMessage($event) {

    console.log('new message: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log($event);
    // this.artistImage = 'http://localhost:3000/api/file/download/picture?objectID=' + $event.album.artist.artist_picture;
    // this.musicPlayerImage = "http://localhost:3000/api/file/download/picture?objectID=" + trackInfo.album.album_cover;

    this.data.sendTrackEvent($event);
    console.log('THIS TRACK INFO: ')
    console.log(this.trackInfo)
  }

  ngOnInit() {
    
  console.log("GETTING ALL SONGS (ngOnInit)")
  this.api.getSongs()
    .subscribe(res => {
      console.log(res);
      this.songs = res;
    }, err => {
      console.log(err);
    });
}

}
export class SongDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }
  connect() {
    console.log('songdatasource connect.')

    return this.api.getSongs();
  }
  disconnect() {
  }
}
