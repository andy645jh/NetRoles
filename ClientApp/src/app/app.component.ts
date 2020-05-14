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
  isLogin:boolean = false;
  isAdmin:boolean = false;
   
  ngOnInit()
  {    
    this.isLogin = this.dataService.getLoginState();
    console.log("ngOnInit", this.isLogin);

    this.dataService.currentState.subscribe(newState => {
      console.log("Cambio: "+this.isLogin);
      this.isLogin = newState;
    });
  }

  constructor(private dataService:DataService, private router:Router, private loginService:LoginService)
  {    
    
  }

  logOut()
  {
    this.loginService.logOut();
    this.dataService.setLoginState(false);
    this.router.navigate(['/']);
  }
}
