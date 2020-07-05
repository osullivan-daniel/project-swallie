import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-home',
  template: `
      <section class="body">
        <div class="body">
          <div class="container">
            <img src="../../assets/icons/menu_black.png" (click)="changeMenu()">
            <h1 class="title">{{headline}}</h1>
          </div>
        </div>
      </section>
  `,
  styles: [
    'h1 { font-weight: bold; }',
    'img { padding-top: 9px; }'
  ]
})

export class HomeComponent implements OnInit {
  headline = "This is here for testing purposes"
  menuVisable=true

  constructor(private smComp: SideMenuComponent) {}

  public changeMenu(): void {
    console.log('testing here')
    this.smComp.changeMenu()
    }
  
  ngOnInit(): void {
  }

  public setText(text): void {
    this.headline=text
  }
}