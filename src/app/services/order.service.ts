import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService 
{
  //order: Subject<any> = new Subject<any>();
  order = new BehaviorSubject(null);
  orderForDisplay = new BehaviorSubject([]);
  orderObjectForAll = new BehaviorSubject([]);
  orderObjectForDisplay = new BehaviorSubject([]);

  public createEmptyOrder(data:any) 
  {
    let tmpOrder = {}
    data.forEach(function(item) 
    {
      tmpOrder[item.name] = {}
      item.size.forEach(function(key) 
      {
        tmpOrder[item.name][key]={
          'enabled': false,
          'qty': 0
        }
      });
    });
    this.order.next(tmpOrder)
  }


  public createOrderObjectForAll (data:any) :void
  {
    let i = 0;
    let tmpOrder = [];
    for (const [key, value] of Object.entries(data)) 
    {
      for (const [innerKey, innerValue] of Object.entries(value['size']))
      {
          i++;
          tmpOrder.push({'id':i, 'name': value['name'], 'size': innerValue, 'qty': 0, 'addToOrder':false })
      }
    }
    this.orderObjectForAll.next(tmpOrder)
    // console.log('createOrderObjectForAll::', this.orderObjectForAll.value)

  }


  public createOrderForDisplay(name:string, size:string, qty:number) 
  {
    let currentOrder = this.orderForDisplay.value;

    // console.log(this.orderForDisplay.value)


    let i = currentOrder.length
    currentOrder.push({'id':i++, 'name': name, 'size': size, 'qty': qty})
    // console.log('currentOrder::',currentOrder)
    this.orderForDisplay.next(currentOrder);
  }
}
