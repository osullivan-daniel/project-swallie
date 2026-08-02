import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PortalAppShellComponent } from './portal-app-shell.component';
import { PortalAppRoutingModule } from './app-routing.module';
import { OrderStateService } from './services/order-state.service';
import { MainBodyComponent } from './components/order-dashboard/main-body/main-body.component';

@NgModule({
  declarations: [
    PortalAppShellComponent,
    MainBodyComponent
  ],
  imports: [BrowserModule, RouterModule, PortalAppRoutingModule],
  providers: [OrderStateService],
  bootstrap: [PortalAppShellComponent]
})
export class PortalAppModule {}
