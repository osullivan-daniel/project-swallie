import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  template:
`
<app-header></app-header>
<app-side-menu></app-side-menu>
<app-footer></app-footer>

`,
  styleUrls: []
})
export class AppComponent implements OnInit{
  title = 'project-swallie';

  constructor(private _data: DataService) { 

  //this._data.availableJsonChange.subscribe(value => {this.jsonOfOptions=value; this.keysOfOptions = Object.keys(this.jsonOfOptions)});
}

  ngOnInit(): void {
    // this._data.setSelectedKey('All')
    // this._data.setavailableCatagories()
    // this.sideMenuVisable = this._menuBody.sideMenuVisable;
    // this.backgroundColour = this._guiStyle.backgroundColour;	
    // this.textColour = this._guiStyle.textColour;
    // this._data.getAvailableOptions()
  }
}
