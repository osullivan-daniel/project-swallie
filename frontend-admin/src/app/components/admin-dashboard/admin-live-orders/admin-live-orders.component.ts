import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { config } from '../../../config';
import { OrdersService } from '../../../services/orders.service';
import { AdminService } from '../../../services/admin.service';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';

@Component({
  selector: 'app-admin-live-orders',
  templateUrl: 'admin-live-orders.component.html',
  styleUrls: ['./admin-live-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatListModule, MatCardModule, MatTableModule, MatButtonModule, CurrencyPipe],
})
export class AdminLiveOrdersComponent {
  localQueue: any = [];
  localProgress: any = [];

  displayedColumns = ['name', 'size', 'qty', 'price'];
  currencyCode = config.currency;

  constructor(
    private _adminService: AdminService,
    private readonly ordersService: OrdersService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    console.log('AdminLiveOrdersComponent constructed');
  }

  onMoveToInProgress(index) {
    this._adminService.removeFromInQueue(index)
  }

  ngOnInit(): void {
    this.ordersService.getInQueueOrders().subscribe({
      next: (orders) => {
        console.log('Orders received from FastAPI:', orders);
        this.localQueue = orders;
        this.changeDetectorRef.markForCheck();

        console.log('localQueue:', this.localQueue);
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });

    this.ordersService.getInProgressOrders().subscribe({
      next: (orders) => {
        console.log('Orders received from FastAPI:', orders);
        this.localProgress = orders;
        this.changeDetectorRef.markForCheck();

        console.log('localProgress:', this.localProgress);
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });
  }

  public displayConfirmation(selectedOrder, index): void {
    console.log(selectedOrder);

    let dialogRef = this.dialog.open(AdminConfirmDialogComponent, {
      disableClose: true,
      data: {
        tableNum: selectedOrder.tableNum,
        custName: selectedOrder.custName,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this._adminService.removeFromInProgress(index);
    });
  }
}
