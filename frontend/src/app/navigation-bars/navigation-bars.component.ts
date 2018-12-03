import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bars',
  templateUrl: './navigation-bars.component.html',
  styleUrls: ['./navigation-bars.component.css']
})
export class NavigationBarsComponent implements OnInit {


  searchBox:string;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.searchBox = '';
  }

  test1(){
    console.log(this.searchBox)
  }

}
