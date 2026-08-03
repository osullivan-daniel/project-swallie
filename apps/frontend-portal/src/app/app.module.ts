import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PortalAppShellComponent } from './portal-app-shell.component';
import { PortalAppRoutingModule } from './app-routing.module';
import { OrderStateService } from './services/order-state.service';
import { MainBodyComponent } from './components/order-dashboard/main-body/main-body.component';
import { SideMenuComponent } from './components/order-dashboard/side-menu/side-menu.component';
import { OrderDialogComponent } from './components/order-dashboard/order-dialog/order-dialog.component';
import { UpdateOrderDialogComponent } from './components/order-dashboard/update-order-dialog/update-order-dialog.component';

@NgModule({
  declarations: [
    PortalAppShellComponent,
    MainBodyComponent,
    SideMenuComponent,
    OrderDialogComponent,
    UpdateOrderDialogComponent
  ],
  imports: [BrowserModule, RouterModule, PortalAppRoutingModule],
  providers: [OrderStateService],
  bootstrap: [PortalAppShellComponent]
})
export class PortalAppModule {}
