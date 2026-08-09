import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  productId: number;
  productName: string;
  productSize: string;
  qty: number;
  itemPrice: string;
}

export interface Order {
  orderId: number;
  tableNum: number;
  custName: string;
  orderStatus: string;
  orderedAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  totalPrice: string;
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