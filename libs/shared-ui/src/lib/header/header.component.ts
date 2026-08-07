import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GuiStyleService } from 'shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['div { height: 100px; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})

export class HeaderComponent implements OnInit {
  backgroundColour: string | undefined;

  constructor(private _guiStyle: GuiStyleService) {}

  ngOnInit(): void {
    this.backgroundColour = this._guiStyle.backgroundColour;
  }
}
