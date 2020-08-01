import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';

@Component({
  selector: 'app-admin-live-orders',
  templateUrl: 'admin-live-orders.component.html',
  styles: [
    `#menuIcon {
      cursor: pointer; 
    }`,

    `#tableTest {
      width: 100%;
     }`,
     
    `#cardItemList {
      height: auto;
    }`,

    `
    .mat-footer-row,
    .mat-header-row,
    .mat-row {
        display: inline-flex;
        min-width: 90%;
    }
    `,
    `.mat-column-name {
      flex: 0 0 50% !important;
      width: 50% !important;
    }`,

    `.mat-column-size {
      flex: 0 0 25% !important;
      width: 25% !important;
    }`,

    `.mat-column-qty {
      flex: 0 0 25% !important;
      width: 25% !important;
    }`,

    `::ng-deep .mat-list-item-content {
      display: block !important;
    }`,

    `.button-div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 15px;
    }`
  ]
})

export class AdminLiveOrdersComponent
{
  localQueue: Array<any> = []
  localProgress: Array<any> = []

  displayedColumns = ['name', 'size', 'qty']

  constructor(private _adminService: AdminService, public dialog: MatDialog) 
  { 
    this._adminService.ordersInQueue.subscribe(value => {
      this.localQueue=value;
    });

    this._adminService.ordersInProgress.subscribe(value => {
      this.localProgress=value;
    });
  }


  onMoveToInProgress(index) {    
    this._adminService.removeFromInQueue(index)
  }


  public displayConfirmation(selectedOrder, index): void 
  {
    console.log(selectedOrder)
    
    let dialogRef = this.dialog.open(AdminConfirmDialogComponent,
    { 
      disableClose: true,
      data: {'tableNum': selectedOrder.tableNumber,
             'custName': selectedOrder.customerName}
    });

    dialogRef.afterClosed().subscribe(res => 
    {
      this._adminService.removeFromInProgress(index)
    });
  }
}