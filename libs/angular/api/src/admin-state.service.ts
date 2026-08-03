import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { format } from 'date-fns';
import { Order } from '../../models/src/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {
  localQueue: any[] = [];
  localComplete: any[] = [];
  localProgress: any[] = [];
  localOrderDetails: any[] = [];

  displayBody = new BehaviorSubject('live');
  displaySideMenu = new BehaviorSubject(true);
  menuIconVisable = new BehaviorSubject('hidden');

  ordersInQueue = new BehaviorSubject<any[]>([]);
  ordersComplete = new BehaviorSubject<any[]>([]);
  ordersInProgress = new BehaviorSubject<any[]>([]);
  orderDetailsForAll = new BehaviorSubject<any[]>([]);
  currentOrderNumber = new BehaviorSubject(4);

  exampleOrder = [{ name: 'BLACK IS THE COLOUR', size: 'cans', qty: 1, addToOrder: true }];
  exampleOrder1 = [
    { name: "YOU'RE NOT GETTING ANY", size: "cans", qty: 3, addToOrder: true },
    { name: "YOU'RE NOT GETTING ANY", size: "1/2's", qty: 1, addToOrder: true }
  ];
  exampleOrder2 = [{ name: 'APA', size: "1/2's", qty: 2, addToOrder: true }];
  exampleOrder3 = [
    { name: 'BLACK IS THE COLOUR', size: 'cans', qty: 2, addToOrder: true },
    { name: "YOU'RE NOT GETTING ANY", size: 'cans', qty: 2, addToOrder: true },
    { name: "YOU'RE NOT GETTING ANY", size: "1/2's", qty: 1, addToOrder: true }
  ];

  constructor() {
    this.localComplete.push(new Order('8', 'Tom', format(new Date(), 'MMMM do yyyy, HH:mm:ss'), this.exampleOrder));
    this.localProgress.push(new Order('3', 'James', format(new Date(), 'MMMM do yyyy, HH:mm:ss'), this.exampleOrder3));
    this.localProgress.push(new Order('7', 'Mary', format(new Date(), 'MMMM do yyyy, HH:mm:ss'), this.exampleOrder2));
    this.localQueue.push(new Order('4', 'Timmy', format(new Date(), 'MMMM do yyyy, HH:mm:ss'), this.exampleOrder1));

    this.ordersInQueue.next(this.localQueue);
    this.ordersComplete.next(this.localComplete);
    this.ordersInProgress.next(this.localProgress);
    this.orderDetailsForAll.next(this.localOrderDetails);
  }

  updateOrderQue(orderQue: any) {
    const que = this.ordersInQueue.value;
    que.push(orderQue);
    this.ordersInQueue.next(que);
  }

  updateOrderDetails(orderDetails: any) {
    this.orderDetailsForAll.next(orderDetails);
  }

  setVisableBody(body: string) {
    this.displayBody.next(body);
  }

  setDisplaySideMenu(visable: boolean) {
    this.displaySideMenu.next(visable);
    this.menuIconVisable.next(visable ? 'hidden' : 'visible');
  }

  removeFromInQueue(index: number) {
    const curItem = this.localQueue.splice(index, 1);
    this.localProgress.push(curItem[0]);
    this.ordersInQueue.next(this.localQueue);
    this.ordersInProgress.next(this.localProgress);
  }

  removeFromInProgress(index: number) {
    const curItem = this.localProgress.splice(index, 1);
    this.localComplete.push(curItem[0]);
    this.ordersComplete.next(this.localComplete);
    this.ordersInProgress.next(this.localProgress);
  }
}
