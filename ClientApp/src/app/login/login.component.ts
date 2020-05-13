import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(private router:Router, public loginService: LoginService) { }

  ngOnInit(): void { }

  onSubmit()
  {
    this.loginService.login(this.login).subscribe(data => {
      console.log("Data: ",data);
      if(data.user.role.name=='Administrador')
      {
        console.log("Role: ",data.user.role.name);
        localStorage.setItem("user",JSON.stringify(data.user));
        this.router.navigate(['admin']); 
      }      
    });
  }
}
