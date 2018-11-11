import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs: any;
  audio:any;

  displayedColumns = ['song_title', 'artist_name', 'published_year'];
  dataSource = new SongDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {

  // this.audio = new Audio();
  // this.audio.src = "../../../assets/sounds/test1.mp3";
  // this.audio.load();
  // this.audio.play();
  // console.log("audio?");
    
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
    return this.api.getSongs();
  }
  disconnect() {
  }
}
