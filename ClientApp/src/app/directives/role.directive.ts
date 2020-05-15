import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit{
  @Input('appRole') appRole: string[];
  
  constructor(
    private templateRef: TemplateRef<any>, 
    private viewContainer: ViewContainerRef,
    private dataService:DataService) { }

  ngOnInit(): void 
  {
    this.dataService.currentRole.subscribe(_=>{
      if(this.dataService.isRole(this.appRole))
      {
        this.viewContainer.createEmbeddedView(this.templateRef)
      }else{
        this.viewContainer.clear();
      }
    });    
  }

}
