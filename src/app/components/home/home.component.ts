import { Component, OnInit } from '@angular/core';
import { MenuBodyService } from '../../services/menu-body.service';
import { DataService } from '../../services/data.service';
import { AddToOrderDialogComponent } from '../add-to-order-dialog/add-to-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  template: `
          <div class="container" id="example-container">
              <img id="menuIcon" src="../../assets/icons/menu-black-36dp.svg" 
              (click)="changeMenu()"  
              [ngStyle]="{'visibility': this.displayMenuIcon}">

              <h1 id="appHomeTitle">{{selectedOption}}</h1>

              <div class=flexDiv>
                <div *ngFor="let key of selectedSubMenu">

                <img id=clickableCanImage src={{key.img}} (click)="logMe(key.name)" (click)="displayAddToCart(key)">
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


export class HomeComponent implements OnInit {
  displayMenuIcon:string;
  backgroundColour:string;

  selectedSubMenu;
  availableSelectedMenu; 
  selectedOption;

  constructor(private _menuBody: MenuBodyService, private _data: DataService, public dialog: MatDialog) {
    
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
  
  public logMe(info): void {
    // console.log(info)
  }
    
  public displayAddToCart(selectedItem): void {
    
    let dialogRef = this.dialog.open(AddToOrderDialogComponent, { 
      disableClose:true,
      data: selectedItem
    });

      dialogRef.afterClosed().subscribe(res => {
        // if back/cancel is NOT clicked
        if(res != 'false') 
        {
          console.log("home.component:", res)
          //TODO:: Add to order
        }

      });
    }

    public setDisableDropDowns(allKey): any {
    
      const enabledDisabled = {}
      allKey.forEach(function(item) 
      {
        enabledDisabled[item.name] = {}
        
        item.size.forEach(function(size) 
        {
          enabledDisabled[item.name][size] = false
        });
      });
  
      console.log("first run:", enabledDisabled)
      return enabledDisabled
    }

  ngOnInit(): void {
    // To set visability for the first time.
    this.displayMenuIcon = this._menuBody.menuIconVisable ? 'visible' : 'hidden'
  }
}