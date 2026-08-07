import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GuiStyleService } from '../../../../../../libs/shared-services/src/lib/models/gui-style.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-sidemenu',
    templateUrl: 'admin-sidemenu.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class AdminSidemenuComponent implements OnInit {

  displayBody:string | undefined;
  textColour: string | undefined;
  backgroundColour:string | undefined;
  sideMenuVisable:boolean = true;

  constructor(private _guiStyle: GuiStyleService, private _adminService: AdminService, private router: Router) {}

  changeView(view) {
    this._adminService.setVisableBody(view)
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