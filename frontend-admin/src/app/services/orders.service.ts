import { tap } from 'rxjs/operators';
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
  private inProgressOrdersSubject = new BehaviorSubject<Order[]>([]);
  private inQueueOrdersSubject = new BehaviorSubject<Order[]>([]);

  completedOrders$ = this.completedOrdersSubject.asObservable();
  inProgressOrders$ = this.inProgressOrdersSubject.asObservable();
  inQueueOrders$ = this.inQueueOrdersSubject.asObservable();

  private completedOrdersLoaded = false;
  private inProgressOrdersLoaded = false;
  private inQueueOrdersLoaded = false;

  addCompletedOrder(order: Order): void {
    const currentOrders = this.completedOrdersSubject.value;
    this.completedOrdersSubject.next([...currentOrders, order]);
  }

  addInProgressOrder(order: Order): void {
    const currentOrders = this.inProgressOrdersSubject.value;
    this.inProgressOrdersSubject.next([...currentOrders, order]);
  }

  addInQueueOrder(order: Order): void {
    const currentOrders = this.inQueueOrdersSubject.value;
    this.inQueueOrdersSubject.next([...currentOrders, order]);
  }


  startOrder(orderId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders/${orderId}/start`,{}
    ).pipe(
      tap((startedOrder) => {

        console.log('this', startedOrder)
        const currentInQueue = this.inQueueOrdersSubject.value;
        const currentInProgress = this.inProgressOrdersSubject.value;

        this.inQueueOrdersSubject.next(
          currentInQueue.filter(
            order => order.orderId !== startedOrder.orderId
          )
        );

        this.inProgressOrdersSubject.next([
          ...currentInProgress,
          startedOrder,
        ]);

        console.log('SERVICE QUEUE:', this.inQueueOrdersSubject.value);
        console.log('SERVICE PROGRESS:', this.inProgressOrdersSubject.value);
      })
    );
  }

  completeOrder(orderId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders/${orderId}/complete`,{}
    ).pipe(
      tap((completedOrder) => {

        console.log('this', completedOrder)
        const currentCompleted = this.completedOrdersSubject.value;
        const currentInProgress = this.inProgressOrdersSubject.value;

        this.inProgressOrdersSubject.next(
          currentInProgress.filter(
            order => order.orderId !== completedOrder.orderId
          )
        );

        this.completedOrdersSubject.next([
          ...currentCompleted,
          completedOrder,
        ]);

        console.log('SERVICE PROGRESS:', this.inProgressOrdersSubject.value);
        console.log('SERVICE COMPLETED:', this.completedOrdersSubject.value);
      })
    );
  }

  // completeOrder(orderId: number): Observable<Order> {
  //   return this.http.post<Order>(`${this.apiUrl}/orders/${orderId}/complete`, {});
  // }

  loadCompletedOrders(): void {

    if (this.completedOrdersLoaded) {
      return;
    }

    console.log('Loading Completed Orders');
    this.http.get<Order[]>(`${this.apiUrl}/orders/completed`).subscribe({
      next: (orders) => {
        this.completedOrdersSubject.next(orders);
        this.completedOrdersLoaded = true;
        
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });
  }

  loadInProgressOrders(): void {

    if (this.inProgressOrdersLoaded) {
      return;
    }

    console.log('Loading InProgress Orders');
    this.http.get<Order[]>(`${this.apiUrl}/orders/inProgress`).subscribe({
      next: (orders) => {
        this.inProgressOrdersSubject.next(orders);
        this.inProgressOrdersLoaded = true;
        
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });
  }

  loadInQueueOrders(): void {

    if (this.inQueueOrdersLoaded) {
      return;
    }

    console.log('Loading In Queue Orders');
    this.http.get<Order[]>(`${this.apiUrl}/orders/inQueue`).subscribe({
      next: (orders) => {
        this.inQueueOrdersSubject.next(orders);
        this.inQueueOrdersLoaded = true;
      },
      error: (error) => {
        console.error('Failed to load completed orders:', error);
      },
    });
  }
}
