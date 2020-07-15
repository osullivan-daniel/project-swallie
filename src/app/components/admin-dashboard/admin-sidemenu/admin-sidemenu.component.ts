import { Component, OnInit } from '@angular/core';
import { GuiStyleService } from '../../../services/gui-style.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-sidemenu',
  templateUrl: 'admin-sidemenu.component.html',
  styles: [
    `#matListItems { 
      font-weight: bold; 
      font-family: Andale Mono, monospace, sans-serif;
      color: this.textColour 
    }`
  ]
})

export class AdminSidemenuComponent implements OnInit {

  displayBody:string;
  textColour: string;
  backgroundColour:string;
  sideMenuVisable:boolean = true;

  closeMenu() {
    this.sideMenuVisable = false
  }

  changeView(view) {
    this._adminService.setVisableBody(view)
    this._adminService.setDisplaySideMenu(false);
  }

  constructor(private _guiStyle: GuiStyleService, private _adminService: AdminService) {}

  ngOnInit(): void {
    this._adminService.displayBody.subscribe(value => {this.displayBody=value});    

    this.backgroundColour = this._guiStyle.backgroundColour;
    this.textColour = this._guiStyle.textColour;	
  }

}