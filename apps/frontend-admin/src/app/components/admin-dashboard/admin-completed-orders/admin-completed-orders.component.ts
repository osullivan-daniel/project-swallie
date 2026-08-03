import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminStateService } from '../../../services/admin-state.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';


@Component({
    selector: 'app-admin-completed-orders',
    templateUrl: 'admin-completed-orders.component.html',
    styleUrls: ['admin-completed-orders.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class AdminCompletedOrdersComponent
{
  localComplete: any = []

  displayedColumns = ['name', 'size', 'qty']

  constructor(private _adminService: AdminStateService, public dialog: MatDialog)
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
