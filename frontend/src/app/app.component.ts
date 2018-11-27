import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-angular6';

  constructor(public auth: AuthenticationService, router: Router) {

    if (auth.isLoggedIn()) {
      router.navigate(['songs']);
    } else {
      router.navigate(['home']);
    }


  }

}
