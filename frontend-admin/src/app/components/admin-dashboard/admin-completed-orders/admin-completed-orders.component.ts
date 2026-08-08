import { MatDialog } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  OrdersService,
  CompletedOrder,
} from '../../../services/orders.service';
import { AdminConfirmDialogComponent } from '../admin-confirm-dialog/admin-confirm-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: 'admin-completed-orders.component.html',
  styleUrls: ['admin-completed-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatListModule, MatCardModule, MatTableModule],
})
export class AdminCompletedOrdersComponent implements OnInit {
  localComplete: CompletedOrder[] = [];

  displayedColumns = ['name', 'size', 'qty'];

  constructor(
    private readonly ordersService: OrdersService,
    public dialog: MatDialog,
  ) {
    console.log('AdminCompletedOrdersComponent constructed');
  }

  ngOnInit(): void {
    this.ordersService.getCompletedOrders().subscribe({
      next: (orders) => {
        console.log('Orders received from FastAPI:', orders);
        this.localComplete = orders;
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });
  }

  public displayConfirmation(selectedOrder: any): void {
    console.log(selectedOrder);

    this.dialog.open(AdminConfirmDialogComponent, {
      disableClose: true,
      data: {
        tableNum: selectedOrder.tableNumber,
        custName: selectedOrder.customerName,
      },
    });
  }
}
