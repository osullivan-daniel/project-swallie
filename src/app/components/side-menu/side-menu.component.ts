import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GuiStyleService } from '../../services/gui-style.service';
import { MenuBodyService } from '../../services/menu-body.service';
// import { _getOptionScrollPosition } from '@angular/material/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
      // `
      // <mat-sidenav-container [hasBackdrop]="true">
      //     <mat-sidenav [ngStyle]="{'background-color': this.backgroundColour}" 
      //     mode="side" class="sideNavigation" 
      //     [(opened)]="sideMenuVisable" disableClose>
              
      //     <mat-nav-list [ngStyle]="{'color': this.textColour}">
      //     <img src="assets/icons/close_white.png" (click)="changeMenu()" onmouseover="">
      //     <mat-list-item [routerLink]="'/all'"> All </mat-list-item>
      //     <mat-list-item [routerLink]="'/ipas'"> IPA's </mat-list-item>
      //     <mat-list-item [routerLink]="'/pale-ales'"> Pale Ale's </mat-list-item>
      //     <mat-list-item [routerLink]="'/stouts'"> Stout's </mat-list-item>
      //     <mat-list-item [routerLink]="'/cans'"> Cans </mat-list-item>
      //     <mat-list-item [routerLink]="'/halves'"> 1/2's </mat-list-item>
      //     <mat-list-item [routerLink]="'/thirds'"> 1/3's </mat-list-item>
      //     </mat-nav-list>

      //     </mat-sidenav>
      //         <mat-sidenav-content>
      //             <app-home></app-home>
      //         </mat-sidenav-content>
      // </mat-sidenav-container>
      // `,

  styles: [
    `mat-sidenav { height: 100%; }`,
    `mat-sidenav-content { height: 85vh; }`,
    `mat-nav-list { font-weight: bold; font-family: Andale Mono, monospace, sans-serif;}`,
    `img { float:right; cursor: pointer; }`
]
})

export class SideMenuComponent implements OnInit{

  sideMenuVisable:boolean;
  backgroundColour:string;
  textColour:string;
  jsonOfOptions:JSON;
  keysOfOptions:Array<string>;


  constructor(private breakpointObserver: BreakpointObserver, 
    private _guiStyle: GuiStyleService, 
    private _menuBody: MenuBodyService,
    private _data: DataService) { 
    this.sideMenuVisable = this._menuBody.sideMenuVisable;
    this.backgroundColour = this._guiStyle.backgroundColour;	
    this.textColour = this._guiStyle.textColour;
    this._menuBody.sideMenuVisibilityChange.subscribe(value => {this.sideMenuVisable=value});    
    this._data.availableJsonChange.subscribe(value => {this.jsonOfOptions=value; this.keysOfOptions = Object.keys(this.jsonOfOptions)});
    //this.keysOfOptions = Object.keys(this.jsonOfOptions);
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  public changeMenu(key): void {
    console.log(key)
    this._menuBody.changeMenuVisability()
  }

  ngOnInit(): void {
    this._data.getAvailableOptions()
  }
}