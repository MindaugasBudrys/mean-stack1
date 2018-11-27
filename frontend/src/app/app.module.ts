import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SongComponent } from './song/song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongCreateComponent } from './song-create/song-create.component';
import { SongEditComponent } from './song-edit/song-edit.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MaterialModules } from './material-modules';
import { TrackComponent } from './track/track.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';



const appRoutes: Routes = [



  // { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

  {
    path: 'songs',
    component: SongComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Song List' }
  },
  // {
  //   path: 'song-details/:id',
  //   component: SongDetailComponent,
  //   data: { title: 'Song Details' }
  // },
  // {
  //   path: 'song-create',
  //   component: SongCreateComponent,
  //   data: { title: 'Create Song' }
  // },
  // {
  //   path: 'song-edit/:id',
  //   component: SongEditComponent,
  //   data: { title: 'Edit Song' }
  // },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    SongDetailComponent,
    SongCreateComponent,
    SongEditComponent,
    MusicPlayerComponent,
    TrackComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
