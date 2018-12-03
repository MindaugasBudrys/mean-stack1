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
import { NavigationBarsComponent } from './navigation-bars/navigation-bars.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';

const appRoutes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'songs',
    component: SongComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Song List' }
  },
  { path: 'home',
  redirectTo: 'songs',
  pathMatch: 'full'
  }
  // { path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // }
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
    ProfileComponent,
    NavigationBarsComponent,
    HomeComponent,
    PlaylistsComponent
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
