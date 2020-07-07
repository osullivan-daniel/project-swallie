import { Component, OnInit } from '@angular/core';
import { MenuBodyService } from '../../services/menu-body.service';
import { DataService } from '../../services/data.service';


// <img id="menuIcon" src="../../assets/icons/menu-24px.svg" 
// (click)="changeMenu()"  
// [ngStyle]="{'visibility': this.displayMenuIcon}">


// <md-fab-trigger>
// <md-button aria-label="menu" class="md-fab md-warn">
//   <md-icon md-svg-src="img/icons/menu-24px.svg"></md-icon>
// </md-button>
// </md-fab-trigger>

@Component({
  selector: 'app-home',
  template: `
          <div class="container" id="example-container">



              <img id="menuIcon" src="../../assets/icons/menu-black-36dp.svg" 
              (click)="changeMenu()"  
              [ngStyle]="{'visibility': this.displayMenuIcon}">

              <h1 class="title">{{selectedOption}}</h1>




              <div class=flexDiv>
                <div *ngFor="let key of availableSelectedSubMenu">

                <img id=clickableCanImage src={{key.img}} (click)="logMe(key.name)" (click)="displayAddToCart()">
                <p class=productName>{{key.name}}</p>
                <p class=productName>{{key.APV}}%</p>
                </div>
              </div>









          </div>
  `,
  styles: [
    'h1 { font-weight: bold; text-align: center;}',
    
    '.productName { font-weight: bold; text-align: center; text-overflow: ellipsis; width: 180px;}',
    
    `.flexDiv { 
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
    }`,

    `#menuIcon {
          position: fixed;
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

  selectedOption;
  availableSelectedSubMenu;

  constructor(private _menuBody: MenuBodyService, private _data: DataService) {
    this._menuBody.menuIconVisibilityChange.subscribe(value => {
      this.displayMenuIcon = value ? 'visible' : 'hidden'});

    this._data.selectedKey.subscribe(value => {this.selectedOption=value;});
    this._data.availableSelectedSubMenu.subscribe(value => {this.availableSelectedSubMenu=value;});
  }

  public changeMenu(): void {
    this._menuBody.changeMenuVisability()
  }
  
  public logMe(info): void {
    console.log(info)
  }
    
  public displayAddToCart(): void {
    console.log('CanIDoTwo!!!!')
  }


  
 
  ngOnInit(): void {
    // To set visability for the first time.
    this.displayMenuIcon = this._menuBody.menuIconVisable ? 'visible' : 'hidden'
  }
}