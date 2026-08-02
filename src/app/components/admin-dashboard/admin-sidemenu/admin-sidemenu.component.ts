import { Component, OnInit } from '@angular/core';
import { GuiStyleService } from '../../../services/gui-style.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidemenu',
  templateUrl: 'admin-sidemenu.component.html',
  styleUrls:['admin-sidemenu.component.css'] 
})

export class AdminSidemenuComponent implements OnInit {

  displayBody:string | undefined;
  textColour: string | undefined;
  backgroundColour:string | undefined;
  sideMenuVisable:boolean = true;

  constructor(private _guiStyle: GuiStyleService, private _adminService: AdminService, private router: Router) {}

  closeMenu() {
    this.sideMenuVisable = false
  }

  changeView(view) {
    this._adminService.setVisableBody(view)
    this._adminService.setDisplaySideMenu(false);
  }

  loadOrder(): void {
    this.router.navigate(['/home']);
  }


  ngOnInit(): void {
    this._adminService.displayBody.subscribe(value => {this.displayBody=value});    

    this.backgroundColour = this._guiStyle.backgroundColour;
    this.textColour = this._guiStyle.textColour;	
  }

}