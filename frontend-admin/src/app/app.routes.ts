import { Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminMainComponent }
];