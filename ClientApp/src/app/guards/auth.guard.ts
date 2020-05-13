import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {    
    var role = route.data.expectedRole;
    var data = localStorage.getItem("user");

    if(data == 'undefined')
    {      
      this.router.navigate(['login']);  
      return;
    }

    console.log("AuthGuard Data: ",data);
    var user = JSON.parse(data);
    
    if(user != null)
    {          
      return user.role.name == role;  
    }else{
      this.router.navigate(['login']);      
    }    
  }
  
}
