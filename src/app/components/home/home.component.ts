import { Component, OnInit } from '@angular/core';
import { MenuBodyService } from '../../services/menu-body.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-home',
  template: `
          <div class="container">
              <img src="../../assets/icons/menu_black.png" 
              (click)="changeMenu()"  
              [ngStyle]="{'visibility': this.displayMenuIcon}">

              <h1 class="title">{{headline}}</h1>
          </div>
  `,
  styles: [
    'h1 { font-weight: bold; }',
    'img { padding-top: 9px; }'
  ]
})

export class HomeComponent implements OnInit {
  headline:string = "This is here for testing purposes"
  displayMenuIcon:string;
  backgroundColour:string;

  constructor(private _menuBody: MenuBodyService, private _data: DataService) { 

    this.displayMenuIcon = this._menuBody.menuIconVisable ? 'visible' : 'hidden'

    this._menuBody.menuIconVisibilityChange.subscribe(value => {
      this.displayMenuIcon = value ? 'visible' : 'hidden'});
  }

  public changeMenu(): void {
    console.log('testing here')
    this._menuBody.changeMenuVisability()
  }
  
  public setText(text): void {
    this.headline=text
  }

  ngOnInit(): void {
  }
}