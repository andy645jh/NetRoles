import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'https://localhost:5001/api/v1/user';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),   
  };

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUsers(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map(this.extractData));
  }

  addUser(user: User): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.endpoint, JSON.stringify(user), this.httpOptions);
  }

  removeUser(id: number): Observable<any> {    
    return this.http.delete<any>(this.endpoint + "/" + id);
  }

  updateUser(user: User): Observable<any> {   
    console.log("Role Update: ", user); 
    return this.http.put<any>(this.endpoint + "/" + user.id, JSON.stringify(user), this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
