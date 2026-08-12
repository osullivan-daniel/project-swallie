import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GuiStyleService {
  // TODO:: change readonly to be populated from db or some file?
  readonly backgroundColour: string =  '#000000'; //'#47909A';
  // readonly textColour: string = '#F0EAD6';
  readonly textColour: string = '#00FF41';
}


// Something to play with later....
// .terminal {
//   background: #000;
//   color: #33FF33;
//   font-family: 'VT323', monospace;
//   font-size: 24px;
//   text-shadow: 0 0 5px #33FF33;
// }