import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';  // Breakpoints?
import { GuiStyleService } from '../../services/gui-style.service';
import { MenuBodyService } from '../../services/menu-body.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  styles: [
    `.navContainer {
      hasBackdrop: false;
      background-color: #FFFFFF;
      
    }`,
    `#matListItems { 
      font-weight: bold; 
      font-family: Andale Mono, monospace, sans-serif;
    }`,
    `img { 
      float:right; 
      cursor: pointer; 
    }`,
    `mat-sidenav-container {
      position: fixed;
      height: 90%;
      min-height: 90%;
      width: 100%;
      min-width: 100%;
   }`
  ]
})

export class SideMenuComponent implements OnInit{

  sideMenuVisable:boolean;
  backgroundColour:string;
  textColour:string;
  jsonOfOptions:JSON;
  availableCatagories:Array<string>;

  constructor(private breakpointObserver: BreakpointObserver, private _guiStyle: GuiStyleService, 
              private _menuBody: MenuBodyService, private _data: DataService) { 

    this._menuBody.sideMenuVisibilityChange.subscribe(value => {this.sideMenuVisable=value});    
    this._data.availableCatagories.subscribe(value => {this.availableCatagories = value});
  };

  public changeMenu(key): void {
    this.closeMenu();
    this._data.getSubMenu(key);
  }

  public closeMenu(): void {
    this._menuBody.changeMenuVisability();
  }
  
  ngOnInit(): void {
    this.sideMenuVisable = this._menuBody.sideMenuVisable;    
    this.backgroundColour = this._guiStyle.backgroundColour;	
    this.textColour = this._guiStyle.textColour;
    this._data.getSubMenu('All');
  }


  // TODO:: figure out if this is neaded later
  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  // .pipe(
  //   map(result => result.matches),
  //   shareReplay()
  // );


}