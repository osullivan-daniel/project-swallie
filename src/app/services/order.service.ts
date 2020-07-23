import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService 
{
  orderServiceObjectForAll = new BehaviorSubject([]);

  public createOrderObjectForAll (data:any) :void
  {
    console.log('data::', data)

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
    this.orderServiceObjectForAll.next(tmpOrder)
  }
}
