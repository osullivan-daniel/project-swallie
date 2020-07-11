import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable() 
export class MenuBodyService {

  order: any = {};
  sideMenuVisable:boolean = true;
  menuIconVisable:boolean = false;

  orderChange: Subject<any> = new Subject<any>();
  sideMenuVisibilityChange: Subject<boolean> = new Subject<boolean>();
  menuIconVisibilityChange: Subject<boolean> = new Subject<boolean>();

  changeMenuVisability(): void{
    this.sideMenuVisable=!this.sideMenuVisable
    this.menuIconVisable=!this.menuIconVisable
    this.sideMenuVisibilityChange.next(this.sideMenuVisable);
    this.menuIconVisibilityChange.next(this.menuIconVisable);
  }
}