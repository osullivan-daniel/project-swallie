import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SharedUiModule } from 'shared-ui';
import { GuiStyleService } from 'shared-services';
import { AdminService } from '../../../services/admin.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { AdminSidemenuComponent } from '../admin-sidemenu/admin-sidemenu.component';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { AdminLiveOrdersComponent } from '../admin-live-orders/admin-live-orders.component';
import { AdminCompletedOrdersComponent } from '../admin-completed-orders/admin-completed-orders.component';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin-main.component.html',
  styleUrl: 'admin-main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SharedUiModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    AdminMenuComponent,
    AdminSidemenuComponent,
    AdminProductsComponent,
    AdminLiveOrdersComponent,
    AdminCompletedOrdersComponent
  ],
})
export class AdminMainComponent implements OnInit {
  textColour: string;
  displayBody: string;
  backgroundColour: string;

  sideMenuVisable: boolean = true;
  displayMenuIcon: string = 'hidden';

  closeMenu() {
    this.sideMenuVisable = false;
    this.displayMenuIcon = 'visible';
    this._adminService.setDisplaySideMenu(false);
  }

  openMenu() {
    this.sideMenuVisable = true;
    this.displayMenuIcon = 'hidden';
    this._adminService.setDisplaySideMenu(true);
  }

  onViewChanged(view: string) {
    this._adminService.setVisableBody(view);
  }

  constructor(
    private _guiStyle: GuiStyleService,
    private _adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this._adminService.displayBody.subscribe((value) => {
      this.displayBody = value;
    });
    this._adminService.displaySideMenu.subscribe((value) => {
      this.sideMenuVisable = value;
    });
    this._adminService.menuIconVisable.subscribe((value) => {
      this.displayMenuIcon = value;
    });

    this.backgroundColour = this._guiStyle.backgroundColour;
    this.textColour = this._guiStyle.textColour;
  }
}
