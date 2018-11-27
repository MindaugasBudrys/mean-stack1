import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  playSong(objectID: string) {
    this.messageSource.next(objectID);
  }

}