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
  role:Role = new Role();
  isEditing:boolean = false;

  constructor(public rest:RoleService) { }

  ngOnInit(): void 
  {
    this.getRoles();    
  }

  getRoles()
  {
    this.roles = [];
    this.rest.getRoles().subscribe((data: {}) => {
      console.log(data);
      this.roles = data;
    });
  }

  onEdit(r: Role)
  {
    this.isEditing = true;    
    this.role = r;
    console.log("Role Edit: ",r);
  }

  onRemove(id: number)
  {
    if(confirm("Are you sure you want to remove it?"))
    {
      this.rest.removeRole(id).subscribe(()=> this.getRoles());
    }    
  }

  onCancelEdit()
  {
    this.role = new Role();   
    this.isEditing = false;
  }

  onSave()
  {    
    console.log("Role: ",this.role);

    if(this.isEditing)
    {
      this.rest.updateRole(this.role).subscribe(()=> this.getRoles());
      this.isEditing = false;
    }else{      
      this.rest.addRole(this.role).subscribe(()=> this.getRoles());      
    }

    this.role = new Role();    
  }

}
