import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-confirm-dialog',
  template: `
  <h3 mat-dialog-title>Order Details</h3>
  <div mat-dialog-content>
    <p>Table Number::  {{data.name}}</p>
    <p>Customer Name:: {{data.tableNum}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]>Ok</button>
  </div>
  `,
  styles: [
  ]
})
export class AdminConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

}




