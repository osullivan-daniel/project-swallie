import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from './components/order-dashboard/main-body/main-body.component';
import { PortalAppShellComponent } from './portal-app-shell.component';
import { SideMenuComponent } from './components/order-dashboard/side-menu/side-menu.component';

const routes: Routes = [
  { path: '', component: PortalAppShellComponent },
  { path: 'home', component: MainBodyComponent },
  { path: 'menu', component: SideMenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PortalAppRoutingModule {}
