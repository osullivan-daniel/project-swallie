import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  template:
`
<app-header></app-header>
<app-side-menu></app-side-menu>

`,
  styleUrls: []
})

export class AppComponent{
  title = 'project-swallie';

  constructor(private _data: DataService) {
    this._data.setUpDataService()
  }



}
