import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GuiStyleService {
  // TODO:: change readonly to be populated from db or some file?
  readonly backgroundColour: string = '#47909A';
  readonly textColour: string = '#F0EAD6';
}
