import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router,
              private api: ApiService,
              private route:ActivatedRoute,
              ) { }


  ngOnInit(){
    this.getAllSearchData();
  }

  getAllSearchData(){

    this.route.params.subscribe( params => {

      let parameters = params;

      this.api.searchSongs(parameters)
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });

        this.api.searchAlbums(parameters)
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });

        this.api.searchPlaylists(parameters)
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });

        this.api.searchArtists(parameters)
        .subscribe(res => {
          console.log(res);
        }, err => {
          console.log(err);
        });

    });

  }



}

