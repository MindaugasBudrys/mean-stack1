import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// const apiUrl = "http://52.59.195.40:3000/api";
// const apiUrl = "http://localhost:3000/api";

const searchParam = "search/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getSongs(): Observable<any> {
    console.log(environment.apiRoute + "songs");
    return this.http.get(environment.apiRoute + "songs", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getSong(id: string): Observable<any> {
    const url = `${environment.apiRoute + "songs"}/${id}`;
    console.log(url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
/****PLAYLISTS RELATED APIS****/
  createPlaylist(data): Observable<any>{
    return this.http.post(environment.apiRoute + "playlist", data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPlaylistsByUser(data): Observable<any>{
    console.log(data);
    return this.http.get(environment.apiRoute + "playlist/user/" + data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPlaylistById(data): Observable<any>{
    return this.http.get(environment.apiRoute + "playlist/" + data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  addSongToPlaylist(id, data): Observable<any>{
    let body = {"song": data};
    return this.http.put(environment.apiRoute + "playlist/push/" + id, body, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePlaylist(data): Observable<any>{
    return this.http.delete(environment.apiRoute + "playlist/" + data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  //search methods
/**********************************/
  searchSongs(text): Observable<any>{
    return this.http.get(environment.apiRoute + searchParam + "songs/" + text, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  searchAlbums(text): Observable<any>{
    return this.http.get(environment.apiRoute + searchParam + "albums/" + text, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  searchArtists(text): Observable<any>{
    return this.http.get(environment.apiRoute + searchParam + "artists/" + text, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  searchPlaylists(text): Observable<any>{
    return this.http.get(environment.apiRoute + searchParam + "playlists/" + text, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // postSong(data): Observable<any> {
  //   console.log(apiUrl);
  //   console.log(data);
  //   console.log(httpOptions);
  //   return this.http.post(apiUrl, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  // updateSong(data): Observable<any> {
  //   console.log(apiUrl);
  //   console.log(data);
  //   return this.http.put(apiUrl, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  // deleteSong(id: string): Observable<{}> {
  //   const url = `${apiUrl}/${id}`;
  //   console.log(apiUrl);
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
}
