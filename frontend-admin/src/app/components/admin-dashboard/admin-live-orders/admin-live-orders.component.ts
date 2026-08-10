import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { config } from '../../../config';
import { AdminService } from '../../../services/admin.service';
import {
  Order,
  OrdersService,
  OrderStatus,
} from '../../../services/orders.service';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';

@Component({
  selector: 'app-admin-live-orders',
  templateUrl: 'admin-live-orders.component.html',
  styleUrls: ['./admin-live-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    CurrencyPipe,
  ],
})
export class AdminLiveOrdersComponent {
  localInQueue: Order[] = [];
  localInProgress: Order[] = [];

  displayedColumns = ['name', 'size', 'qty', 'price'];
  currencyCode = config.currency;

  constructor(
    public dialog: MatDialog,
    private _adminService: AdminService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ordersService: OrdersService,
    
  ) {
    console.log('AdminLiveOrdersComponent constructed');
  }

  onMoveToInProgress(index) {
    this._adminService.removeFromInQueue(index);
  }

  ngOnInit(): void {
    this.ordersService.loadInProgressOrders();
    this.ordersService.loadInQueueOrders();

    this.ordersService.inProgressOrders$.subscribe((orders) => {
      this.localInProgress = orders;
      this.cdr.markForCheck();
    });

    this.ordersService.inQueueOrders$.subscribe((orders) => {
      this.localInQueue = orders;
      this.cdr.markForCheck();
    });
  }

  startOrder(order: Order): void {
    this.ordersService.startOrder(order.orderId).subscribe({
      next: () => {
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to start order', error);
      },
    });
  }

  completeOrder(order: Order): void {
    this.ordersService.completeOrder(order.orderId).subscribe({
      next: (completedOrder) => {
        this.localInProgress = this.localInProgress.filter(
          (eachOrder) => eachOrder.orderId !== order.orderId,
        );

        this.ordersService.addCompletedOrder(completedOrder);

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to start order', error);
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
