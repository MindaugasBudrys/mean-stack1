import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// const apiUrl = "http://52.59.195.40:3000/api";
const apiUrl = "http://localhost:3000/api";



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
    console.log(apiUrl + "/songs");
    return this.http.get(apiUrl + "/songs", httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getSong(id: string): Observable<any> {
    const url = `${apiUrl + "/songs"}/${id}`;
    console.log(url);
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  createPlaylist(data): Observable<any>{
    return this.http.post(apiUrl + "/playlist", data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPlaylistsByUser(data): Observable<any>{
    console.log(data);
    return this.http.get(apiUrl + "/playlist/user/" + data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addSongToPlaylist(id, data): Observable<any>{
    let body = {"song": data};
    return this.http.put(apiUrl + "/playlist/push/" + id, body, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePlaylist(data): Observable<any>{
    return this.http.delete(apiUrl + "/playlist/" + data, httpOptions)
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
