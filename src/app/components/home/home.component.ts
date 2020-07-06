import { Component, OnInit } from '@angular/core';
import { MenuBodyService } from '../../services/menu-body.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-home',
  template: `
          <div class="container" id="example-container">
              <img id="menuIcon" src="../../assets/icons/menu_black.png" 
              (click)="changeMenu()"  
              [ngStyle]="{'visibility': this.displayMenuIcon}">

              <h1 class="title">{{selectedOption}}</h1>




              <div class=flexDiv>
                <div *ngFor="let key of test">
                <img id=clickableCanImage src={{key.img}} (click)="logMe(key.name)">
                </div>
              </div>









          </div>
  `,
  styles: [
    'h1 { font-weight: bold; text-align: center;}',
    '#cans { text-align: center; }',
    '#menuIcon { padding-top: 9px; }',
    `.flexDiv { display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
              }`,
  ]
})


//           <mat-list-item ng-repeat="let x in test" (click)="changeMenu()">{{ x.name }}</mat-list-item>


export class HomeComponent implements OnInit {
  headline:string = "This is here for testing purposes"
  displayMenuIcon:string;
  backgroundColour:string;
  jsonOfOptions:JSON;

  selectedOption = "Stout's"

  test = [
    { "name": "15",
     "APV": 9.7,
     "img": "../../assets/img/15+can+shot+small.jpg",
     "desc": "this will be the description",
     "size": ["cans"]
   },
   { 
     "name": "SOTERIOLOGY",
     "APV": 11.7,
     "img": "../../assets/img/soteriology+can+shot+small.jpg",
     "desc": "this will be the description",
     "size": ["cans","1/3's"]
   },
   {
     "name":"YOU'RE NOT GETTING ANY",
     "APV": 12,
     "img": "../../assets/img/youre+not+getting+any+can+shot+small.jpg",
     "desc": "this will be the description",
     "size": ["cans","1/2's"]
   }
  ]



  constructor(private _menuBody: MenuBodyService, private _data: DataService) {
    this._menuBody.menuIconVisibilityChange.subscribe(value => {
      this.displayMenuIcon = value ? 'visible' : 'hidden'});

      // this._data.availableJsonChange.subscribe(value => {
      //   this.jsonOfOptions=value; this.keysOfOptions = Object.keys(this.jsonOfOptions)});
  }

  public changeMenu(): void {
    this._menuBody.changeMenuVisability()
  }
  
  public logMe(info): void {
    console.log(info)
  }

  public setText(text): void {
    this.headline=text
  }
 
  ngOnInit(): void {
        // To set visability for the first time.
        this.displayMenuIcon = this._menuBody.menuIconVisable ? 'visible' : 'hidden'
  }
}




// <mat-list-item *ngFor="let key of test">
// <mat-list-item>{{ key.name }}</mat-list-item>
// <mat-list-item>{{ key.img }}</mat-list-item>
// <mat-list-item>{{ key.APV }}</mat-list-item>
// <mat-list-item>{{ key.desc }}</mat-list-item>
// </mat-list-item>