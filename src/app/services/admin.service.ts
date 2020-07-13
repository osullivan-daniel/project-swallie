import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

localQueue: any = []
localProgress: any = []

displayBody = new BehaviorSubject('live');
ordersInQueue = new BehaviorSubject(null);
ordersInProgress = new BehaviorSubject(null);


exampleOrder = {
      'info': {'orderNumber': 1, 'tableNumber': 1, 'name': 'Tom'},
      'order': [{'name': "BLACK IS THE COLOUR", 'size': "cans", 'qty': 1, 'addToOrder': true}]}


exampleOrder1 = {
      'info': {'orderNumber': 2, 'tableNumber': 5, 'name': 'Harry'},
      'order': [{'name': "YOU'RE NOT GETTING ANY", 'size': "cans", 'qty': 3, 'addToOrder': true},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 1, 'addToOrder': true}]}

exampleOrder2 = {
      'info': {'orderNumber': 3, 'tableNumber': 8, 'name': 'Thomas'},
      'order':[{'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 2, 'addToOrder': true}]}

exampleOrder3 = {
      'info': {'orderNumber': 4, 'tableNumber': 9, 'name': 'Mary'},
      'order':[{'name': "BLACK IS THE COLOUR", 'size': "cans", 'qty': 2, 'addToOrder': true},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "cans", 'qty': 2, 'addToOrder': true},
              {'name': "YOU'RE NOT GETTING ANY", 'size': "1/2's", 'qty': 1, 'addToOrder': true}]}
  
  
  
constructor() {
      // this.localQueue.push(this.exampleOrder)
      // this.localProgress.push(this.exampleOrder1)
      // this.localProgress.push(this.exampleOrder2)
      // this.localProgress.push(this.exampleOrder3)

      this.localQueue.push(this.exampleOrder)
      this.localQueue.push(this.exampleOrder1)
      this.localProgress.push(this.exampleOrder2)
      this.localProgress.push(this.exampleOrder3)

      this.ordersInQueue.next(this.localQueue)
      this.ordersInProgress.next(this.localProgress)
}

setVisableBody(body:string) 
{
    this.displayBody.next(body)
}



}



