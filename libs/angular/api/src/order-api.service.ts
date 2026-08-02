import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../../models/src/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  private readonly orderStream = new BehaviorSubject<Order[]>([]);

  public loadOrders(): Observable<Order[]> {
    return this.orderStream.asObservable();
  }

  public publishOrders(orders: Order[]): void {
    this.orderStream.next(orders);
  }
}
