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
import { Order,OrdersService } from '../../../services/orders.service';

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
    private readonly cdr: ChangeDetectorRef,
    private readonly ordersService: OrdersService,
    
  ) {
    console.log('AdminLiveOrdersComponent constructed');
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
        console.log(`Order ${order.orderId} started`);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to start order', error);
      },
    });
  }

  completeOrder(order: Order): void {
    this.ordersService.completeOrder(order.orderId).subscribe({
      next: () => {
        console.log(`Order ${order.orderId} completed`);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Failed to complete order', error);
      },
    });
  }
}
