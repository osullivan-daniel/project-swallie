import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GuiStyleService } from 'shared-services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl:'./header.component.css',
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
