import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  endpoint = 'https://localhost:5001/api/v1/role';
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

  getRoles(): Observable<any> {
    return this.http.get(this.endpoint).pipe(map(this.extractData));
  }

  addRole(role: Role): Observable<any> {
    console.log(role);
    return this.http.post<any>(this.endpoint, JSON.stringify(role), this.httpOptions);
  }

  removeRole(id: number): Observable<any> {    
    return this.http.delete<any>(this.endpoint + "/" + id);
  }

  updateRole(role: Role): Observable<any> {   
    console.log("Role Update: ", role); 
    return this.http.put<any>(this.endpoint + "/" + role.id, JSON.stringify(role), this.httpOptions);
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
