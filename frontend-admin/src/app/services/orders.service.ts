import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export enum OrderStatus {
  IN_QUEUE = 'inQueue',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
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
  order: OrderItem[];
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly apiUrl = 'http://127.0.0.1:8000';

  constructor(private readonly http: HttpClient) {}

  getCompletedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders/completed`
    );
  }

  getInProgressOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders/inProgress`
    );
  }

  getInQueueOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.apiUrl}/orders/inQueue`
    );
  }
}