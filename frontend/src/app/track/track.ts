import {Artist} from './artist';
import {Album} from './album';

export class Track {
    _id: string = '';
    
    title : string = '';
    duration : Number = 0;
    song_file : string= '';
    
    artist : Artist = new Artist();
    album : Album = new Album();
}