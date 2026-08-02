import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';

@Component({
    selector: 'app-admin-live-orders',
    templateUrl: 'admin-live-orders.component.html',
    styleUrls: ['./admin-live-orders.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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