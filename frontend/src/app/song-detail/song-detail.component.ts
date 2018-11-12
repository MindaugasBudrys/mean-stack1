import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  book = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getSongDetails(this.route.snapshot.params['id']);
  }

  getSongDetails(id) {
    this.api.getSong(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }

  deleteSong(id) {
    this.api.deleteSong(id)
      .subscribe(res => {
          this.router.navigate(['/songs']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}