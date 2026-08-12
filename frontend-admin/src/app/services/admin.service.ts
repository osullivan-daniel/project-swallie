import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminService 
{
  displayBody = new BehaviorSubject('live');
  displaySideMenu = new BehaviorSubject(true);
  menuIconVisable = new BehaviorSubject('hidden');


  constructor() {}

  setVisableBody(body:string) 
  {
    this.displayBody.next(body)
  }
  

  setDisplaySideMenu(visable: boolean)
  {
    this.displaySideMenu.next(visable);
    this.menuIconVisable.next(visable ? 'hidden' : 'visible'); 
  } 

}