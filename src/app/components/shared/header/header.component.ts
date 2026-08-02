import { Component, OnInit } from '@angular/core';
import { GuiStyleService } from '../../../services/gui-style.service';

@Component({
    selector: 'app-header',
    template: `
    <nav class="navbar">

    <!-- logo -->
    <div class="navbar-brand" [ngStyle]="{'background-color': this.backgroundColour}">

      <a class="navbar-item">
        <!-- make configurable!!! -->
        <img src="../assets/img/BoundaryLogo_Large_White_300x.png">
      </a>
    </div>
  </nav>
  `,
    styles: [
        'div { height: 100px; width: 100%; }'
    ],
    standalone: false
})
export class HeaderComponent implements OnInit {

  backgroundColour:string;

  constructor(private _guiStyle: GuiStyleService) {}

  ngOnInit(): void {
    this.backgroundColour = this._guiStyle.backgroundColour;	
  }

}   