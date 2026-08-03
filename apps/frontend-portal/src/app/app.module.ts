import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { GuiStyleService } from "../../../../libs/angular/api/src/gui-style.service";
import { MenuBodyService } from "../../../../libs/angular/api/src/menu-body.service";

import { PortalAppShellComponent } from "./portal-app-shell.component";

import { MainBodyComponent } from "./components/order-dashboard/main-body/main-body.component";
import { SideMenuComponent } from "./components/order-dashboard/side-menu/side-menu.component";
import { HeaderComponent } from '../../../../libs/angular/ui/src/shared/header/header.component';
import { OrderDialogComponent } from "./components/order-dashboard/order-dialog/order-dialog.component";
import { updateOrderDialogComponent } from "./components/order-dashboard/update-order-dialog/update-order-dialog.component";

import { RouterOutlet } from '@angular/router'

@NgModule({
	declarations: [MainBodyComponent, OrderDialogComponent, SideMenuComponent, updateOrderDialogComponent, HeaderComponent],
	imports: [RouterOutlet, BrowserModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule, MatRadioModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatTableModule, FormsModule, ReactiveFormsModule],
	providers: [GuiStyleService, MenuBodyService],
	bootstrap: [PortalAppShellComponent],
})
export class PortalAppModule {}
