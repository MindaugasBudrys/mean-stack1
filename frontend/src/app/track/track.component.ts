import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Track } from './track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  @Input() trackToDisplay: Track;

  @Output() onClickPlay = new EventEmitter<string>();
  // @Input() artistToFind: string = '';



  constructor() { }

  ngOnInit() {
    console.log(this.trackToDisplay);
  }

  clickedPlay(){
    // console.log(this.trackToDisplay._id);
    this.onClickPlay.emit(this.trackToDisplay.song_file);
  }

}
