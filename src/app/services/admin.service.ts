import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/services/order';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class AdminService 
{

  localQueue: any = [];
  localComplete: any = [];
  localProgress: any = [];
  localOrderDetails: any = [];

  displayBody = new BehaviorSubject('live');
  displaySideMenu = new BehaviorSubject(true);
  menuIconVisable = new BehaviorSubject('hidden');

  ordersInQueue = new BehaviorSubject(null);
  ordersComplete = new BehaviorSubject(null);
  ordersInProgress = new BehaviorSubject(null);
  orderDetailsForAll = new BehaviorSubject(null);
  currentOrderNumber = new BehaviorSubject(4);


  orderDetails = {1:{'tableNum': 1, 'name': 'Tom'},
                 2:{'tableNum': 5, 'name': 'Harry'},
                 3:{'tableNum': 8, 'name': 'Thomas'},
                 4:{'tableNum': 9, 'name': 'Mary'}}

  exampleOrder =  [{'name': "BLACK IS THE COLOUR", 'size': "cans", 'qty': 1, 'addToOrder': true,}]

  exampleOrder1 = [{'name': "YOU'RE NOT GETTING ANY", 'size': "cans", 'qty': 3, 'addToOrder': true},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 1, 'addToOrder': true}]

  exampleOrder2 = [{'name': "APA", 'size': "1/2's", 'qty': 2, 'addToOrder': true}]

  exampleOrder3 = [{'name': "BLACK IS THE COLOUR", 'size': "cans", 'qty': 2, 'addToOrder': true},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "cans", 'qty': 2, 'addToOrder': true},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 1, 'addToOrder': true}]

  constructor() 
  {
    // these are for local manipulation before 'broadcast'
    this.localComplete.push(new Order('8', 'Tom', moment().format('MMMM Do YYYY, HH:mm:ss'), this.exampleOrder))
    this.localProgress.push(new Order('3', 'James', moment().format('MMMM Do YYYY, HH:mm:ss'), this.exampleOrder3))
    this.localProgress.push(new Order('7', 'Mary', moment().format('MMMM Do YYYY, HH:mm:ss'), this.exampleOrder2))
    this.localQueue.push(new Order('4', 'Timmy', moment().format('MMMM Do YYYY, HH:mm:ss'), this.exampleOrder1))
    
    // These are for all subscribers
    this.ordersInQueue.next(this.localQueue)
    this.ordersComplete.next(this.localComplete)
    this.ordersInProgress.next(this.localProgress)
    this.orderDetailsForAll.next(this.localOrderDetails)
  }


  updateOrderQue(orderQue)
  {
    let que = this.ordersInQueue.value
    que.push(orderQue)
    this.ordersInQueue.next(que)
  }


  updateOrderDetails(orderDetails)
  {
    this.orderDetailsForAll.next(orderDetails)
  }


  setVisableBody(body:string) 
  {
    this.displayBody.next(body)
  }
  

  setDisplaySideMenu(visable: boolean)
  {
    this.displaySideMenu.next(visable);
    this.menuIconVisable.next(visable ? 'hidden' : 'visible'); 
  } 


  removeFromInQueue(index)
  {
    let curItem = this.localQueue.splice(index, 1);
    this.localProgress.push(curItem[0])
    this.ordersInQueue.next(this.localQueue)
  }


  removeFromInProgress(index)
  {
    let curItem = this.localProgress.splice(index, 1);
    this.localComplete.push(curItem[0])
    this.ordersComplete.next(this.localComplete)
    this.ordersInProgress.next(this.localProgress)
  }
}