import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminAppShellComponent } from './admin-app-shell.component';
import { AdminAppRoutingModule } from './app-routing.module';
import { AdminStateService } from './services/admin-state.service';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';
import { AdminMenuComponent } from './components/admin-dashboard/admin-menu/admin-menu.component';
import { AdminLiveOrdersComponent } from './components/admin-dashboard/admin-live-orders/admin-live-orders.component';
import { AdminProductsComponent } from './components/admin-dashboard/admin-products/admin-products.component';
import { AdminConfirmDialogComponent } from './components/admin-dashboard/admin-confirm-dialog/admin-confirm-dialog.component';
import { AdminCompletedOrdersComponent } from './components/admin-dashboard/admin-completed-orders/admin-completed-orders.component';
import { AdminSidemenuComponent } from './components/admin-dashboard/admin-sidemenu/admin-sidemenu.component';

@NgModule({
  declarations: [
    AdminAppShellComponent,
    AdminMainComponent,
    AdminMenuComponent,
    AdminLiveOrdersComponent,
    AdminProductsComponent,
    AdminConfirmDialogComponent,
    AdminCompletedOrdersComponent,
    AdminSidemenuComponent
  ],
  imports: [BrowserModule, RouterModule, AdminAppRoutingModule],
  providers: [AdminStateService],
  bootstrap: [AdminAppShellComponent]
})
export class AdminAppModule {}
