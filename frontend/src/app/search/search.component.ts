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
    this.route.params.subscribe( params => {





      this.api.searchSongs(params['searchfield'])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });

      this.api.searchAlbums(params['searchfield'])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });

      this.api.searchPlaylists(params['searchfield'])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });

      this.api.searchArtists(params['searchfield'])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    



      
    });
}


}


// 

