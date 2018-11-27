import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Track } from '../track/track'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  // <Track> or smth else? was string.

  private messageSource = new BehaviorSubject<Track>(new Track());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  sendTrackEvent(track: Track) {
    this.messageSource.next(track);
  }

}