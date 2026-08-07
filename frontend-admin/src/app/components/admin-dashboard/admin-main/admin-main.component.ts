import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GuiStyleService } from 'shared-services';
import { AdminService } from '../../../services/admin.service'



@Component({
    selector: 'app-admin',
    templateUrl: 'admin-main.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AdminMainComponent implements OnInit {

  textColour: string;
  displayBody:string;
  backgroundColour:string;

  sideMenuVisable:boolean = true;
  displayMenuIcon:string = 'hidden'

  closeMenu() 
  {
    this.sideMenuVisable = false;
    this.displayMenuIcon = 'visible';
    this._adminService.setDisplaySideMenu(false);
  }

  openMenu() {
    this.sideMenuVisable = true;
    this.displayMenuIcon = 'hidden';
    this._adminService.setDisplaySideMenu(true);
  }

  constructor(private _guiStyle: GuiStyleService, private _adminService: AdminService) {}

  ngOnInit(): void {
    this._adminService.displayBody.subscribe(value => {this.displayBody=value});    
    this._adminService.displaySideMenu.subscribe(value => {this.sideMenuVisable=value});    
    this._adminService.menuIconVisable.subscribe(value => {this.displayMenuIcon=value});    

    this.backgroundColour = this._guiStyle.backgroundColour;
    this.textColour = this._guiStyle.textColour;	
  }
}
