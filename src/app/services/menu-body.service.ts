import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable() 
export class MenuBodyService {

  sideMenuVisable:boolean = true
  menuIconVisable:boolean = false

  sideMenuVisibilityChange: Subject<boolean> = new Subject<boolean>();
  menuIconVisibilityChange: Subject<boolean> = new Subject<boolean>();

  changeMenuVisability(): void{
    console.log("changeMenuVisability")
    this.sideMenuVisable=!this.sideMenuVisable
    this.menuIconVisable=!this.menuIconVisable

    console.log(this.menuIconVisable)

    this.sideMenuVisibilityChange.next(this.sideMenuVisable);
    this.menuIconVisibilityChange.next(this.menuIconVisable);
  }
}