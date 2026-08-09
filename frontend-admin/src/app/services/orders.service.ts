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

export interface CompletedOrder {
  orderId: number;
  tableNum: number;
  custName: string;
  orderStatus: string;
  orderedAt: string;
  completedAt: string;
  totalPrice: string;
  order: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly apiUrl = 'http://127.0.0.1:8000';

  constructor(private readonly http: HttpClient) {}

  getCompletedOrders(): Observable<CompletedOrder[]> {
    return this.http.get<CompletedOrder[]>(
      `${this.apiUrl}/orders/completed`
    );
  }
}