import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint = 'https://localhost:5001/api/v1/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),   
  };
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  login( login : Login ): Observable<any> {
    return this.http.post<any>(this.endpoint, JSON.stringify(login),this.httpOptions);   
  }
}
