import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-admin-confirm-dialog',
    template: `
  <h3 mat-dialog-title>Order Details</h3>
  <div mat-dialog-content>
    <p>Table Number::  {{data.tableNum}}</p>
    <p>Customer Name:: {{data.custName}}</p>
  </div>
  <div mat-dialog-actions class='button-div'>
    <button mat-button [mat-dialog-close]>Ok</button>
  </div>
  `,
    styles: [
        `.button-div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
  }`
    ],
    standalone: false
})
export class AdminConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

}




