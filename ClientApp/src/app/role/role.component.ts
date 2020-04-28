import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/Role';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit 
{
  roles:any = [];
  role:Role = { name: ''};

  constructor(public rest:RoleService) { }

  ngOnInit(): void 
  {
    this.roles = [];
    this.rest.getRoles().subscribe((data: {}) => {
      console.log(data);
      this.roles = data;
    });    
  }

  onEdit()
  {

  }

  onRemove()
  {

  }

  onAdd()
  {    
    console.log("Role: ",this.role);
    this.rest.addRole(this.role);
  }

}
