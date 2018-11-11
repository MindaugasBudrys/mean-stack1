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


const appRoutes: Routes = [
  {
    path: 'songs',
    component: SongComponent,
    data: { title: 'Song List' }
  },
  {
    path: 'song-details/:id',
    component: SongDetailComponent,
    data: { title: 'Song Details' }
  },
  {
    path: 'song-create',
    component: SongCreateComponent,
    data: { title: 'Create Song' }
  },
  {
    path: 'song-edit/:id',
    component: SongEditComponent,
    data: { title: 'Edit Song' }
  },
  { path: '',
    redirectTo: '/songs',
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
    MusicPlayerComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
