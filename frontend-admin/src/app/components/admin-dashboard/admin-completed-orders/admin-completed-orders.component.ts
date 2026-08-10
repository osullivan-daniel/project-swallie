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
import { OrdersService, Order } from '../../../services/orders.service';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: 'admin-completed-orders.component.html',
  styleUrl: 'admin-completed-orders.component.css',
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
export class AdminCompletedOrdersComponent implements OnInit {
  localCompleted: Order[] = [];

  displayedColumns = ['name', 'size', 'qty', 'price'];
  currencyCode = config.currency;

  constructor(
    public dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly ordersService: OrdersService,
    
  ) {
    console.log('AdminCompletedOrdersComponent constructed');
  }

  ngOnInit(): void {
    this.ordersService.loadCompletedOrders();

    this.ordersService.completedOrders$.subscribe((orders) => {
      this.localCompleted = orders;
      this.cdr.markForCheck();
    });
  }

  public displayConfirmation(selectedOrder: Order): void {
    console.log(selectedOrder);

    this.dialog.open(AdminConfirmDialogComponent, {
      disableClose: true,
      data: {
        tableNum: selectedOrder.tableNum,
        custName: selectedOrder.custName,
      },
    });
  }
}
