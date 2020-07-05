import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GuiStyleService } from '../../services/gui-style.service';
import { MenuBodyService } from '../../services/menu-body.service';

@Component({
  selector: 'app-side-menu',
  template:
`
<mat-sidenav-container [hasBackdrop]="true">
                <mat-sidenav [ngStyle]="{'background-color': this.backgroundColour}" #sidenav mode="side" class="sideNavigation" [(opened)]="sideMenuVisable" disableClose>
                        <mat-nav-list [ngStyle]="{'color': this.textColour}">
                                <a><img src="assets/icons/close_white.png" (click)="changeMenu()" onmouseover=""></a>
                                <a mat-list-item [routerLink]="'/all'"> All </a>
                                <a mat-list-item [routerLink]="'/ipas'"> IPA's </a>
                                <a mat-list-item [routerLink]="'/pale-ales'"> Pale Ale's </a>
                                <a mat-list-item [routerLink]="'/stouts'"> Stout's </a>
                                <a mat-list-item [routerLink]="'/cans'"> Cans </a>
                                <a mat-list-item [routerLink]="'/halves'"> 1/2's </a>
                                <a mat-list-item [routerLink]="'/thirds'"> 1/3's </a>
                        </mat-nav-list>
                </mat-sidenav>
                <mat-sidenav-content>
                    <app-home></app-home>
                </mat-sidenav-content>
        </mat-sidenav-container>

`,

  styles: [
    `mat-sidenav { height: 100%; }`,
    `mat-sidenav-content { height: 85vh; }`,
    `mat-nav-list { font-weight: bold; font-family: Andale Mono, monospace, sans-serif;}`,
    `img { float:right; cursor: pointer; }`
]
})

export class SideMenuComponent {

  sideMenuVisable:boolean;
  backgroundColour:string;
  textColour:string;


  constructor(private breakpointObserver: BreakpointObserver, private _guiStyle: GuiStyleService, private _menuBody: MenuBodyService) { 
    this.sideMenuVisable = this._menuBody.sideMenuVisable;
    this.backgroundColour = this._guiStyle.backgroundColour;	
    this.textColour = this._guiStyle.textColour;
    this._menuBody.sideMenuVisibilityChange.subscribe(value => {this.sideMenuVisable=value});
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  public changeMenu(): void {
    this._menuBody.changeMenuVisability()
  }


  // constructor(private _menuBody: MenuBodyService ) { 
  //   this.displayMenuIcon = this._menuBody.displayMenuIcon;
  // }

  // public changeMenu(): void {
  //   console.log('testing here')
  //   this.displayMenuIcon = this._menuBody.changeMenuIconVisability()
  // }


}