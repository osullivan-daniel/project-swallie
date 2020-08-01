import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/order-dashboard/side-menu/side-menu.component';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SideMenuComponent },
  { path: 'admin', component: AdminMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
