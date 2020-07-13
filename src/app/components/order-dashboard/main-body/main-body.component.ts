import { Component, OnInit } from '@angular/core';
import { MenuBodyService } from '../../../services/menu-body.service';
import { DataService } from '../../../services/data.service';
import { updateOrderDialogComponent } from '../update-order-dialog/update-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-main-body',
  template: `
          <div class="container" id="example-container">
              <img id="menuIcon" src="../../assets/icons/menu-black-36dp.svg" 
              (click)="changeMenu()"  
              [ngStyle]="{'visibility': this.displayMenuIcon}">

              <h1 id="appHomeTitle">{{selectedOption}}</h1>

              <div class=flexDiv>
                <div *ngFor="let key of selectedSubMenu">

                <img id=clickableCanImage src={{key.img}} (click)="displayupdateCart(key)">
                <p class=productName>{{key.name}}</p>
                <p class=productName>{{key.APV}}%</p>
                </div>
              </div>
          </div>
  `,
  styles: [
    '#appHomeTitle { font-weight: bold; text-align: center;}',
    
    '.productName { font-weight: bold; text-align: center; text-overflow: ellipsis; width: 180px;}',
    
    `.flexDiv { 
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
    }`,

    `#menuIcon {
          position: fixed;
          cursor: pointer; 
    }`,
     
    `#clickableCanImage {
          height: 270px;
          width: 180px;
    }`
  ]
})


export class MainBodyComponent implements OnInit {
  
  displayMenuIcon:string;
  backgroundColour:string;
  order: any = {};

  selectedSubMenu;
  availableSelectedMenu; 
  selectedOption;

  constructor(private _menuBody: MenuBodyService, private _data: DataService, public dialog: MatDialog) 
  {
    this._menuBody.menuIconVisibilityChange.subscribe(value => {
      this.displayMenuIcon = value ? 'visible' : 'hidden'
    });

    this._data.selectedSubMenu.subscribe(value => {
      this.selectedSubMenu=value;
    });
  }

  public changeMenu(): void {
    this._menuBody.changeMenuVisability()
  }

  public displayupdateCart(selectedItem): void 
  {
    this.dialog.open(updateOrderDialogComponent, 
    { 
      disableClose: true,
      data: selectedItem.name
    });
  }

  ngOnInit(): void {
    // To set visability for the first time.
    this.displayMenuIcon = this._menuBody.menuIconVisable ? 'visible' : 'hidden'
  }
}