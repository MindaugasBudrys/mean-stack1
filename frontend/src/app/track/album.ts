import {Artist} from './artist';

export class Album {
  _id: string = '';

  title: string = '';
  release_date: string= '';
  duration: Number = 0;
  artist : Artist = new Artist();
}
