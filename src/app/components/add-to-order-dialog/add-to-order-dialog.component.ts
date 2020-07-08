import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-order-dialog',
  template: 
  `
    <h1 mat-dialog-title>Dialog with elements</h1>

    <div mat-dialog-content>This dialog showcases the title, close, content and actions elements.</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrls: [],

})
export class AddToOrderDialogComponent{}