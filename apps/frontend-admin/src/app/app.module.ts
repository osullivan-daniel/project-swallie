import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminAppShellComponent } from './admin-app-shell.component';
import { AdminAppRoutingModule } from './app-routing.module';
import { AdminStateService } from './services/admin-state.service';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';

@NgModule({
  declarations: [
    AdminAppShellComponent,
    AdminMainComponent
  ],
  imports: [BrowserModule, RouterModule, AdminAppRoutingModule],
  providers: [AdminStateService],
  bootstrap: [AdminAppShellComponent]
})
export class AdminAppModule {}
