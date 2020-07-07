import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GuiStyleService } from '../../services/gui-style.service';
import { MenuBodyService } from '../../services/menu-body.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
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
  availableCatagories:Array<string>;

  constructor(private breakpointObserver: BreakpointObserver, private _guiStyle: GuiStyleService, 
              private _menuBody: MenuBodyService, private _data: DataService) { 

    this._menuBody.sideMenuVisibilityChange.subscribe(value => {this.sideMenuVisable=value});    
    this._data.availableCatagories.subscribe(value => {this.availableCatagories = value});
    console.log('hello')
    console.log(this.availableCatagories)
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  public changeMenu(key): void {
    this.closeMenu()
    this._data.setSelectedOptions(key)
  }

  public closeMenu(): void {
    this._menuBody.changeMenuVisability()
  }
  

  ngOnInit(): void {
    this.sideMenuVisable = this._menuBody.sideMenuVisable;    
    this.backgroundColour = this._guiStyle.backgroundColour;	
    this.textColour = this._guiStyle.textColour;
    this._data.setSelectedOptions('All')
  }
}