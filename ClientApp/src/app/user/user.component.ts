import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit
{

  roles:any = [];
  users:any = [];
  user:User = new User();
  isEditing:boolean = false;

  constructor(public restUser:UserService, public restRole:RoleService) { }

  ngOnInit(): void 
  {    
    this.getRoles();   
    this.getUsers(); 
  }

  getUsers()
  {
    this.users = [];
    this.restUser.getUsers().subscribe((data: {}) => {
      console.log("Users: ", data);
      this.users = data;
    });
  }

  getRoles()
  {
    this.roles = [];
    this.restRole.getRoles().subscribe((data: {}) => {
      console.log("Roles: ", data);
      this.roles = data;
    });
  }

  onEdit(u: User)
  {
    this.isEditing = true;    
    this.user = u;
    console.log("User Edit: ",u);
  }

  onRemove(id: number)
  {
    if(confirm("Are you sure you want to remove it?"))
    {
      this.restUser.removeUser(id).subscribe(()=> this.getRoles());
    }    
  }

  onCancelEdit()
  {
    this.user = new User();   
    this.isEditing = false;
  }

  onSave()
  {    
    console.log("User: ",this.user);

    if(this.isEditing)
    {
      this.restUser.updateUser(this.user).subscribe(()=> this.getUsers());
      this.isEditing = false;
    }else{      
      this.restUser.addUser(this.user).subscribe(()=> this.getUsers());      
    }

    this.user = new User();    
  }

}
