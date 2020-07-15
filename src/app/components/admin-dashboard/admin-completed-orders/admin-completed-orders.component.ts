import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
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
export class AdminCompletedOrdersComponent implements OnInit {

  //localComplete: Array<any> = []
  localOrderDetails: Array<any> = []
  localDisplayListComplete: Array<any> = [];

  displayedColumns = ['name', 'size', 'qty']

  constructor(private _adminService: AdminService, public dialog: MatDialog) 
  { 
    this._adminService.orderDetailsForAll.subscribe(value => {
      this.localOrderDetails=value;
    });
    
    this._adminService.ordersComplete.subscribe(value => {

      value.forEach( item => {
        this.localDisplayListComplete.push(new MatTableDataSource(item))
      });
    });
  }

  public displayConfirmation(selectedOrder): void 
  {
    let orderId = selectedOrder._data.value[0]['orderNum']
    this.dialog.open(AdminConfirmDialogComponent,
    { 
      disableClose: true,
      data: this.localOrderDetails[0][orderId]
    });
  }

  ngOnInit(): void {}

}
