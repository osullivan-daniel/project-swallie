import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'


// order-dashboard components
import { AppComponent } from './app.component';

import { MainBodyComponent } from './components/order-dashboard/main-body/main-body.component';
import { SideMenuComponent } from './components/order-dashboard/side-menu/side-menu.component';
import { OrderDialogComponent } from './components/order-dashboard/order-dialog/order-dialog.component';
import { updateOrderDialogComponent } from './components/order-dashboard/update-order-dialog/update-order-dialog.component';

// admin-dashboard components
import { AdminMainComponent } from './components/admin-dashboard/admin-main/admin-main.component';
import { AdminSidemenuComponent } from './components/admin-dashboard/admin-sidemenu/admin-sidemenu.component';
import { AdminLiveOrdersComponent } from './components/admin-dashboard/admin-live-orders/admin-live-orders.component';
// shared
import { HeaderComponent } from './components/shared/header/header.component';

// services
import { DataService } from './services/data.service';
import { GuiStyleService } from './services/gui-style.service';
import { MenuBodyService } from './services/menu-body.service';
import { AdminMenuComponent } from './components/admin-dashboard/admin-menu/admin-menu.component';
import { AdminProductsComponent } from './components/admin-dashboard/admin-products/admin-products.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainBodyComponent,
    SideMenuComponent,
    updateOrderDialogComponent,
    OrderDialogComponent,
    AdminMainComponent,
    AdminSidemenuComponent,
    AdminLiveOrdersComponent,
    AdminMenuComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [
    GuiStyleService,
    MenuBodyService,
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [updateOrderDialogComponent]
})

export class AppModule { }
