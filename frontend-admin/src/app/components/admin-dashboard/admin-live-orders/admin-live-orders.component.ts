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
    private _adminService: AdminService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ordersService: OrdersService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    console.log('AdminLiveOrdersComponent constructed');
  }

  onMoveToInProgress(index) {
    this._adminService.removeFromInQueue(index);
  }

  ngOnInit(): void {
    this.ordersService.getInQueueOrders().subscribe({
      next: (orders) => {
        console.log('Orders received from FastAPI:', orders);
        this.localInQueue = orders;
        this.changeDetectorRef.markForCheck();

        console.log('localInQueue:', this.localInQueue);
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });

    this.ordersService.getInProgressOrders().subscribe({
      next: (orders) => {
        console.log('Orders received from FastAPI:', orders);
        this.localInProgress = orders;
        this.changeDetectorRef.markForCheck();

        console.log('localInProgress:', this.localInProgress);
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });
  }

  startOrder(order: Order): void {
    this.ordersService.startOrder(order.orderId).subscribe({
      next: () => {
        console.log(`Order ${order.orderId} started`);
        this.localInQueue = this.localInQueue.filter(
          (eachOrder) => eachOrder.orderId !== order.orderId,
        );

        this.localInProgress = [
          ...this.localInProgress,
          {
            ...order,
            orderStatus: OrderStatus.IN_PROGRESS,
          },
        ];

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
