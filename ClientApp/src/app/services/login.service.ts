import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Role } from '../models/Role';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService 
{
  endpoint = 'https://localhost:5001/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  role:Role;

  constructor(private http: HttpClient, private dataService:DataService) {}

  login(login: Login): Observable<any> {
    return this.http
      .post<any>(this.endpoint + "login", JSON.stringify(login), this.httpOptions)
      .pipe(
        map((data) => {
          this.dataService.setLoginState(true);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          return data;
        }),
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  logOut() 
  {
    localStorage.clear();    
  }

  isAdmin() : boolean
  {
    return false;
  }
}
