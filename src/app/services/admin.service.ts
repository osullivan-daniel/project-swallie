import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';

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

  exampleOrder =  [{'name': "BLACK IS THE COLOUR", 'size': "cans", 'qty': 1, 'addToOrder': true, 'orderNum':1}]

  exampleOrder1 = [{'name': "YOU'RE NOT GETTING ANY", 'size': "cans", 'qty': 3, 'addToOrder': true, 'orderNum':2},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 1, 'addToOrder': true, 'orderNum':2}]

  exampleOrder2 = [{'name': "APA", 'size': "1/2's", 'qty': 2, 'addToOrder': true, 'orderNum':3}]

  exampleOrder3 = [{'name': "BLACK IS THE COLOUR", 'size': "cans", 'qty': 2, 'addToOrder': true, 'orderNum':4},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "cans", 'qty': 2, 'addToOrder': true, 'orderNum':4},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 1, 'addToOrder': true, 'orderNum':4}]

  
  constructor() 
  {
    // these are for local manipulation before 'broadcast'
    this.localProgress.push(this.exampleOrder)
    this.localProgress.push(this.exampleOrder3)
    this.localProgress.push(this.exampleOrder2)
    this.localQueue.push(this.exampleOrder1)
    this.localOrderDetails.push(this.orderDetails)
    
    // These are for all subscribers
    this.ordersInQueue.next(this.localQueue)
    this.ordersComplete.next(this.localComplete)
    this.ordersInProgress.next(this.localProgress)
    this.orderDetailsForAll.next(this.localOrderDetails)
  }


  updateOrderNum(num)
  {
    this.currentOrderNumber.next(num)
  }

  updateOrderQue(orderQue)
  {
    this.ordersInQueue.next(orderQue)
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