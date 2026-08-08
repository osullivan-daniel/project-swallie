import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GuiStyleService } from 'shared-services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['div { height: 100px; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})

export class HeaderComponent implements OnInit {
  backgroundColour: string | undefined;

  constructor(private _guiStyle: GuiStyleService) {}

  ngOnInit(): void {
    this.backgroundColour = this._guiStyle.backgroundColour;
  }
}
