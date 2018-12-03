import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthenticationService, UserDetails } from "../authentication.service";
import { PlayerService} from '../music-player/player-service';

declare var $: any;

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  isSongsShowed: boolean = false;

  public playlistReq: any = {
    title: '',
    description: '',
    user: ''
  };

  public tempID: any;

  public userDetails: UserDetails;
  public playlists: any;

  constructor(private api: ApiService,
    private auth: AuthenticationService,
    private data: PlayerService) {

    }

  ngOnInit() {
    this.refresh();
  }

  newSongPlayed($event) {


    console.log('new message: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log($event);
    // this.artistImage = 'http://localhost:3000/api/file/download/picture?objectID=' + $event.album.artist.artist_picture;
    // this.musicPlayerImage = "http://localhost:3000/api/file/download/picture?objectID=" + trackInfo.album.album_cover;

    this.data.sendTrackEvent($event);
    console.log('THIS TRACK INFO: ')
    // console.log(this.trackInfo)
  }

  public refresh(){
    this.userDetails = this.auth.getUserDetails();
    this.getPlaylistsByUser();
  }

  public openPlaylist(data){
    this.isSongsShowed = true;
    this.api.getPlaylistById(data)
    .subscribe(res => {

      this.playlists = res;
      console.log(this.playlists);
    }, err => {
      console.log(err);
    });
    // if(this.isSongsShowed){
    //   this.isSongsShowed = false;
    // } else {
    //   this.isSongsShowed = true; 
    // }
  }

  public backToPlaylists(){
    this.isSongsShowed = false;
    this.refresh();
  }

  public deletePlaylist(data){
    this.api.deletePlaylist(data)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.refresh();
  }

  public getPlaylistsByUser(){
    // console.log(this.userDetails._id);
    this.api.getPlaylistsByUser(this.userDetails._id)
    .subscribe(res => {
      console.log(res);
      this.playlists = res;
      console.log(this.playlists);
    }, err => {
      console.log(err);
    });
    this.closeConfModal();
  }

  public createPlaylist(){
    this.playlistReq.user = this.userDetails._id;
    console.log(this.playlistReq);
    this.api.createPlaylist(this.playlistReq)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.refresh();
    this.closeModal();
  }

  public openConfModal(id){
    this.tempID = id;
    $('#confirmationModal').modal('show');
  }
  
  public closeConfModal(){
    $('#confirmationModal').modal('hide');
  }

  public openModal(){
    $('#myModal').modal('show');
  }

  public closeModal(){
    $('#myModal').modal('hide');
  }
}
