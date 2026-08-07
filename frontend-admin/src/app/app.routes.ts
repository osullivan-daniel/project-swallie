// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'admin', component: AdminMainComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, {})],
//   exports: [RouterModule]
// })

// export class AppRoutingModule { }


import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {path: 'admin', component: AdminMainComponent }
];