import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';
import { AdminAppShellComponent } from './admin-app-shell.component';
import { AdminCompletedOrdersComponent } from './components/admin-dashboard/admin-completed-orders/admin-completed-orders.component';
import { AdminLiveOrdersComponent } from './components/admin-dashboard/admin-live-orders/admin-live-orders.component';
import { AdminProductsComponent } from './components/admin-dashboard/admin-products/admin-products.component';

const routes: Routes = [
  { path: '', component: AdminAppShellComponent },
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/completed', component: AdminCompletedOrdersComponent },
  { path: 'admin/live', component: AdminLiveOrdersComponent },
  { path: 'admin/products', component: AdminProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminAppRoutingModule {}
