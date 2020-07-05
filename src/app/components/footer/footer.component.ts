import { Component, OnInit } from '@angular/core';
import { GuiStyleService } from '../../services/gui-style.service';


@Component({
  selector: 'app-footer',
  template: 
  `
  <div>
    <p [ngStyle]="{'background-color': this.backgroundColour, 'color': this.textColour}">
     © O'Sullivan Technologies Ltd.
    </p>
   </div>
  `,

  styles: [
    'div { width: 100%; }',
    'p { text-align:right; font-family:Satisfy }'
  ]
})

export class FooterComponent implements OnInit {

  backgroundColour:string;
  textColour:string;

  constructor(private _guiStyle: GuiStyleService) { 
    this.backgroundColour = this._guiStyle.backgroundColour;	
    this.textColour = this._guiStyle.textColour;
  }

  ngOnInit(): void {
  }

}