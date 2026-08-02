import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';
import { AdminAppShellComponent } from './admin-app-shell.component';

const routes: Routes = [
  { path: '', component: AdminAppShellComponent },
  { path: 'admin', component: AdminMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminAppRoutingModule {}
