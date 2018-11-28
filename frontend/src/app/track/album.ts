import {Artist} from './artist';

export class Album {
  _id: string = '';

  title: string = '';
  release_date: string= '';
  duration: Number = 0;
  album_cover: string = ''; //album cover id in gridfs
  artist : Artist = new Artist();
}
