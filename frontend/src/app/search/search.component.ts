import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

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




  constructor(private router: Router,
              private api: ApiService,
              private route:ActivatedRoute,
              ) { }


  ngOnInit(){
    console.log('search componente ngoninit')
    // this.getAllSearchData();
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

  onButtonClick(){

  }

  getAllSearchData(){
    console.log('PASEARCHINA VISKA NX: ')



  }



}

