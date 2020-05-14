import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private loginState = new BehaviorSubject(false);
  currentState = this.loginState.asObservable();

  constructor() { }

  setLoginState(newState: boolean) {        
    this.loginState.next(newState);
  }

  getLoginState():boolean{
    return this.loginState.value;
  }
}
