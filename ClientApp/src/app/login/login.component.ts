import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(
    private router:Router, 
    public loginService: LoginService,
    public dataService: DataService,
    ) 
  { }

  ngOnInit(): void 
  {
    if(!this.dataService.isRole(['None']))
    {
      this.redirect(this.dataService.getRole());
    }
  }

  redirect(roleName: string)
  {
    switch(roleName)
    {
      case 'Administrador':
        this.router.navigate(['admin']); 
      break;

      case 'Invitado':
        this.router.navigate(['guess']); 
      break;

      default:
        this.router.navigate(['/']); 
      break;
    }
  }

  onSubmit()
  {
    this.loginService.login(this.login).subscribe(data => {
      console.log("Data: ",data);
      this.redirect(data.user.role.name);
    });
  }
}
