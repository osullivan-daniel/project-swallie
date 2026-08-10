import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export enum OrderStatus {
  IN_QUEUE = 'inQueue',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  productId: number;
  productName: string;
  productSize: string;
  qty: number;
  itemPrice: number;
}

export interface Order {
  orderId: number;
  tableNum: number;
  custName: string;
  orderStatus: OrderStatus;
  orderedAt: Date;
  completedAt: Date | null;
  cancelledAt: Date | null;
  totalPrice: number;
  orderItems: OrderItem[];
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = 'http://127.0.0.1:8000';

  private completedOrdersSubject = new BehaviorSubject<Order[]>([]);

  completedOrders$ = this.completedOrdersSubject.asObservable();

  getCompletedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/completed`);
  }

  appendLocalCompleteOrder(order: Order): void {
    const currentOrders = this.completedOrdersSubject.value;

    this.completedOrdersSubject.next([...currentOrders, order]);
  }

  getInProgressOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/inProgress`);
  }

  getInQueueOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/inQueue`);
  }

  startOrder(orderId: number) {
    return this.http.post(`http://127.0.0.1:8000/orders/${orderId}/start`, {});
  }
}
