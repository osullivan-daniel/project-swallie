import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { GuiStyleService } from "../../../../../../../src/app/services/gui-style.service";
import { AdminStateService } from "../../../services/admin-state.service";

@Component({
	selector: "app-admin",
	templateUrl: "admin-main.component.html",
	styles: [
		`
			#menuIcon {
				cursor: pointer;
			}
		`,
		`
			mat-sidenav-container {
				height: 100vh;
				min-height: 100vh;
				width: 100%;
				min-width: 100%;
			}
		`,
		`
			.navContainer {
				height: 100vh;
				hasbackdrop: false;
				background-color: #ffffff;
			}
		`,
		`
			mat-sidenav-content {
				min-width: 0;
				overflow-x: auto;
			}

			#example-container {
				/* Table width plus the card and list horizontal padding. */
				min-width: 28rem;
			}
		`,
		`
			#closeMenu {
				display: flex !important;
				margin-left: 75%;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false,
})
export class AdminMainComponent implements OnInit {
	textColour: string;
	displayBody: string;
	backgroundColour: string;

	sideMenuVisable: boolean = true;
	displayMenuIcon: string = "hidden";

	closeMenu() {
		this.sideMenuVisable = false;
		this.displayMenuIcon = "visible";
		this._adminService.setDisplaySideMenu(false);
	}

	openMenu() {
		this.sideMenuVisable = true;
		this.displayMenuIcon = "hidden";
		this._adminService.setDisplaySideMenu(true);
	}

	constructor(
		private _guiStyle: GuiStyleService,
		private _adminService: AdminStateService,
	) {}

	ngOnInit(): void {
		this._adminService.displayBody.subscribe((value) => {
			this.displayBody = value;
		});
		this._adminService.displaySideMenu.subscribe((value) => {
			this.sideMenuVisable = value;
		});
		this._adminService.menuIconVisable.subscribe((value) => {
			this.displayMenuIcon = value;
		});

		this.backgroundColour = this._guiStyle.backgroundColour;
		this.textColour = this._guiStyle.textColour;
	}
}
