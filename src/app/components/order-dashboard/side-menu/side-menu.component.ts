import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';  // Breakpoints?
import { GuiStyleService } from '../../../services/gui-style.service';
import { MenuBodyService } from '../../../services/menu-body.service';
//import { DataService } from '../../../services/data.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';


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
      color: this.textColour 
    }`,
    `img { 
      float:right; 
      cursor: pointer; 
    }`,
    `.navContainer {
      height: 100vh;
      hasBackdrop: false;
      background-color: #FFFFFF;
    }`,
    `mat-sidenav-container {
      height: 100vh;
      min-height: 100vh;
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

  constructor(private breakpointObserver: BreakpointObserver, 
              private _guiStyle: GuiStyleService, 
              private _menuBody: MenuBodyService, 
              //private _data: DataService,
              private __menuService: MenuService,
              public dialog: MatDialog,
              private router: Router) { 

    this._menuBody.sideMenuVisibilityChange.subscribe(value => {this.sideMenuVisable=value});    
    this.__menuService.availableCatagories.subscribe(value => {this.availableCatagories = value});
    console.log('side-menu available catagories::', this.availableCatagories)
  };


  public changeMenu(key): void {
    this.closeMenu();
    this.__menuService.setNewSubMenu(key);
  }


  public closeMenu(): void {
    this._menuBody.changeMenuVisability();
  }



  public displayCart(): void 
  {
    

    let dialogRef = this.dialog.open(OrderDialogComponent, 
    { 
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => 
    {
      if (!(res === 'false'))
      {
      }
    });
  }

  loadAdmin(): void {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
    this.sideMenuVisable = this._menuBody.sideMenuVisable;    
    this.backgroundColour = this._guiStyle.backgroundColour;	
    this.textColour = this._guiStyle.textColour;
    // set the default menu to 'All'
    this.__menuService.setNewSubMenu('All');
  }
}