import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation-bars',
  templateUrl: './navigation-bars.component.html',
  styleUrls: ['./navigation-bars.component.css']
})
export class NavigationBarsComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

}
