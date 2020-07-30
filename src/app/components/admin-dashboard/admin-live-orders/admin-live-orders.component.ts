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

export class AdminLiveOrdersComponent implements OnInit 
{
  localQueue: Array<any> = []
  localProgress: Array<any> = []
  localOrderDetails: Array<any> = []
  localDisplayListInProgress: Array<any> = [];
  localDisplayListInQueue: Array<any> = [];

  displayedColumns = ['name', 'size', 'qty']

  constructor(private _adminService: AdminService, public dialog: MatDialog) 
  { 
    this._adminService.ordersInQueue.subscribe(value => {
      this.localQueue=value;
    });

    this._adminService.ordersInProgress.subscribe(value => {
      this.localProgress=value;
    });

    this._adminService.orderDetailsForAll.subscribe(value => {
      this.localOrderDetails=value;
    });
  }


  onMoveToInProgress(index) {
    this._adminService.removeFromInQueue(index)
    this.updateDisplayLists(this.localProgress, this.localQueue)
  }


  updateDisplayLists(inProgress, inQueue) 
  {
    this.localDisplayListInQueue = []
    this.localDisplayListInProgress = []

    inProgress.forEach( item => {
      this.localDisplayListInProgress.push(new MatTableDataSource(item))
    });

    inQueue.forEach( item => {
      this.localDisplayListInQueue.push(new MatTableDataSource(item))
    });
  }


  public displayConfirmation(selectedOrder, index): void 
  {
    let orderId = selectedOrder._data.value[0]['orderNum']
    this.dialog.open(AdminConfirmDialogComponent,
    { 
      disableClose: true,
      data: this.localOrderDetails[0][orderId]
    });

    this.onCompleteOrderReview(index) 
  }

  
  onCompleteOrderReview(index) {
    this._adminService.removeFromInProgress(index)
    this.updateDisplayLists(this.localProgress, this.localQueue)  
  }


  ngOnInit(): void {
    this.updateDisplayLists(this.localProgress, this.localQueue)
  }
}