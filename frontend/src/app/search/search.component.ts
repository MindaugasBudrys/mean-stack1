import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { PlayerService} from '../music-player/player-service';
import { AuthenticationService, UserDetails } from "../authentication.service";

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  resultSongs:any;
  resultAlbums:any;
  resultPlaylists: any;
  resultArtists:any;

  public tempID: any;

  public playlistReq: any = {
    title: '',
    description: '',
    user: ''
  };

  private userDetails: UserDetails;


  constructor(private router: Router,
              private api: ApiService,
              private auth: AuthenticationService,
              private route:ActivatedRoute,
              private data: PlayerService
              ) { }


  ngOnInit(){
    console.log('search componente ngoninit')
    // this.getAllSearchData();
    this.userDetails = this.auth.getUserDetails();
  }

  getSearchResults(){
    this.route.params.subscribe( params => {
      console.log('PARAMETRAI: ')

      let par = params['searchfield'];
      console.log(par)
      this.api.searchSongs(par)
        .subscribe(res => {
          this.resultSongs = res;
          console.log(res);
        }, err => {
          console.log(err);
        });

        this.api.searchAlbums(par)
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });

        this.api.searchPlaylists(par)
        .subscribe(res => {
          this.resultPlaylists = res;
          console.log(res);
        }, err => {
          console.log(err);
        });

        this.api.searchArtists(par)
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });

    });
  }


  onPlaylistClick(id){
    this.router.navigate(['/playlists/'+id]);
  }


  newMessage($event) {

    console.log('new message: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log($event);
    // this.artistImage = 'http://localhost:3000/api/file/download/picture?objectID=' + $event.album.artist.artist_picture;
    // this.musicPlayerImage = "http://localhost:3000/api/file/download/picture?objectID=" + trackInfo.album.album_cover;

    this.data.sendTrackEvent($event);
    // console.log('THIS TRACK INFO: ')
    // console.log(this.trackInfo)s
  }

  public deletePlaylist(data){
    this.api.deletePlaylist(data)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    this.getSearchResults();
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
    this.getSearchResults();
    this.closeModal();


  }


  getAllSearchData(){
    console.log('PASEARCHINA VISKA NX: ')
  }

  public openConfModal(id){
    console.log('SHOULD OPEN?')
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

