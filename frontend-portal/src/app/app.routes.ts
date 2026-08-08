import { Routes } from '@angular/router';
import { SideMenuComponent } from './components/order-dashboard/side-menu/side-menu.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SideMenuComponent },
];

