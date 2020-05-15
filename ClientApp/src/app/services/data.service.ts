import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { RoleService } from './role.service';

@Injectable()
export class DataService {
  private roleState = new BehaviorSubject({});  
  currentRole = this.roleState.asObservable();
  private role: string = 'None';

  constructor() 
  {
    var user = JSON.parse(localStorage.getItem("user"));
    var token = JSON.parse(localStorage.getItem("token"));     
    this.LoginState({ user, token: token}); 
  }

  LoginState(userInfo: any) {
    console.log("User: ",userInfo);    
    console.log("User: ",userInfo.role);
    this.role = (userInfo.user!=null) ? userInfo.user.role.name : 'None';   
    console.log("Role: ",this.role);            
    this.roleState.next(userInfo);
  }

  getRole():string{
    return this.role;
  }

  isRole(roles: string[])
  {
    for(const oneRole of roles) 
    {
      if(this.role==oneRole) return true;
    }    
    return false;
  }
}
