import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table'
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: 'admin-completed-orders.component.html',
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
        display: flex;
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
export class AdminCompletedOrdersComponent
{
  localComplete: Array<any> = []

  displayedColumns = ['name', 'size', 'qty']

  constructor(private _adminService: AdminService, public dialog: MatDialog) 
  {
    this._adminService.ordersComplete.subscribe(value => {
      this.localComplete=value;
    });
  }

  public displayConfirmation(selectedOrder): void 
  {
    console.log(selectedOrder)
    
    this.dialog.open(AdminConfirmDialogComponent,
    { 
      disableClose: true,
      data: {'tableNum': selectedOrder.tableNumber,
             'custName': selectedOrder.customerName}
    });
  }
}
