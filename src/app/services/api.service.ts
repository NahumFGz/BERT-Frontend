import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Bert } from '../models/bert'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'http://127.0.0.1:3000/predict'

  constructor( private http: HttpClient) { }

  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  //Handle API error
  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      //A client-side or network error ocurred
      console.error('An error ocurred:', error.error.message);
    } else {
      //The backend returned  an unsuccessfull response code
      //The response body may contain clues as to what went wrong
      console.error(
        `Backend returned code ${error.status}` +
        `Body was: ${error.error}`
      );
    }
    //Return an observable with user-facing error message
    return throwError(
      'Something bad happened; please try again later'
    );
  };

  //Create a new item
  predict(item): Observable<Bert>{
    return this.http
    .post<Bert>(this.base_path, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
