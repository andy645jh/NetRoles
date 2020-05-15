import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{  
   
  ngOnInit()
  {     
  }

  constructor(private dataService:DataService, private router:Router, private loginService:LoginService)
  {    
    console.log("constructor App");
  }

  logOut()
  {
    this.loginService.logOut();
    this.router.navigate(['/']);
  }
}
