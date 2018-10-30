import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {


  songForm: FormGroup;
  artist_name:string='';
  song_title:string='';
  description:string='';
  length:string='';
  published_year:string='';
  record_label:string='';
  file_id:string='';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.songForm = this.formBuilder.group({
      'artist_name' : [null, Validators.required],
      'song_title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'length' : [null, Validators.required],
      'published_year' : [null, Validators.required],
      'record_label' : [null, Validators.required],
      'file_id' : [null, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postSong(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        });
  }

}
