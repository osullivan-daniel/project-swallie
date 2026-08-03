import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminAppRoutingModule } from "./app-routing.module";
import { AdminStateService } from "../../../../libs/angular/api/src/admin-state.service";
import { AdminAppShellComponent } from "./admin-app-shell.component";
import { HeaderComponent } from '../../../../libs/angular/ui/src/shared/header/header.component';
import { AdminMainComponent } from "./components/admin-dashboard/admin-main/admin-main.component";
import { AdminMenuComponent } from "./components/admin-dashboard/admin-menu/admin-menu.component";
import { AdminSidemenuComponent } from "./components/admin-dashboard/admin-sidemenu/admin-sidemenu.component";
import { AdminProductsComponent } from "./components/admin-dashboard/admin-products/admin-products.component";
import { AdminLiveOrdersComponent } from "./components/admin-dashboard/admin-live-orders/admin-live-orders.component";
import { AdminConfirmDialogComponent } from "./components/admin-dashboard/admin-confirm-dialog/admin-confirm-dialog.component";
import { AdminCompletedOrdersComponent } from "./components/admin-dashboard/admin-completed-orders/admin-completed-orders.component";


@NgModule({
	declarations: [
    AdminMainComponent, 
    AdminMenuComponent, 
    AdminLiveOrdersComponent, 
    AdminProductsComponent, 
    AdminConfirmDialogComponent, 
    AdminCompletedOrdersComponent, 
    AdminSidemenuComponent,
    HeaderComponent
  ],
	imports: [
    BrowserModule, 
    RouterModule, 
    AdminAppRoutingModule, 
    AdminAppShellComponent, 
    MatListModule, 
    MatCardModule, 
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
	providers: [AdminStateService],
	bootstrap: [AdminAppShellComponent],
})

export class AdminAppModule {}
