import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select'
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
//import { DataService } from './services/data.service';
//import { ProductService } from './services/product.service';
import { GuiStyleService } from './services/gui-style.service';
import { MenuBodyService } from './services/menu-body.service';
import { AdminMenuComponent } from './components/admin-dashboard/admin-menu/admin-menu.component';
import { AdminProductsComponent } from './components/admin-dashboard/admin-products/admin-products.component';
import { AdminConfirmDialogComponent } from './components/admin-dashboard/admin-confirm-dialog/admin-confirm-dialog.component';
import { AdminCompletedOrdersComponent } from './components/admin-dashboard/admin-completed-orders/admin-completed-orders.component';




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
        AdminProductsComponent,
        AdminConfirmDialogComponent,
        AdminCompletedOrdersComponent,
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
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        GuiStyleService,
        MenuBodyService
        //DataService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
