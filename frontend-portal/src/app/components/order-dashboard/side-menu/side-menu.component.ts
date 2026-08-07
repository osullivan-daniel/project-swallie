import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GuiStyleService } from 'shared-services';
import { MenuBodyService } from 'shared-services';
//import { DataService } from '../../../services/data.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuService } from 'shared-services';


@Component({
    selector: 'app-side-menu',
    templateUrl: 'side-menu.component.html',
    styleUrls: ['side-menu.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class SideMenuComponent implements OnInit{

  sideMenuVisable:boolean | undefined;
  backgroundColour:string | undefined;
  textColour:string | undefined;
  jsonOfOptions:JSON | undefined;
  availableCatagories: [] | undefined;

  constructor(
              private _guiStyle: GuiStyleService, 
              private _menuBody: MenuBodyService, 
              //private _data: DataService,
              private __menuService: MenuService,
              public dialog: MatDialog,
              private router: Router) { 

    this._menuBody.sideMenuVisibilityChange.subscribe(value => {this.sideMenuVisable=value});    
    this.__menuService.availableCatagories.subscribe(value => {this.availableCatagories=value});
    console.log('side-menu available catagories::', this.availableCatagories)
  };


  public changeMenu(key): void {
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
      data: this.__menuService.getAvaliableMenuAll()
    });

    dialogRef.afterClosed().subscribe(res => 
    {
      if (!(res === false))
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