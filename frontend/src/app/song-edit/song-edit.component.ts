import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  songForm: FormGroup;
  id:string = '';
  isbn:string = '';
  title:string = '';
  description:string = '';
  author:string = '';
  publisher:string = '';
  published_year:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getSong(this.route.snapshot.params['id']);
    this.songForm = this.formBuilder.group({
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'published_year' : [null, Validators.required]
    });
  }

  getSong(id) {
    this.api.getSong(id).subscribe(data => {
      this.id = data._id;
      this.songForm.setValue({
        isbn: data.isbn,
        title: data.title,
        description: data.description,
        author: data.author,
        publisher: data.publisher,
        published_year: data.published_year
      });
    });
  }

  //???
  onFormSubmit(form:NgForm) {
    this.api.updateSong(this.id)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/song-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  songDetails() {
    this.router.navigate(['/song-details', this.id]);
  }

}
