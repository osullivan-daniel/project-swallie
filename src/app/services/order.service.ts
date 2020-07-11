import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService 
{
  //order: Subject<any> = new Subject<any>();
  order = new BehaviorSubject(null);

  public setOrder(key: string, updatedOrder: Array<{}>) 
  {
    // this.order[key] = updatedOrder;
    this.order[key].next(updatedOrder)
    console.log('has it has ir has it', this.order.value)
    console.log('updated.....')

    this.order[key].next(updatedOrder)
  }

  public createEmptyOrder(data:any) 
  {
    let tmpOrder = {}
    data.forEach(function(item) 
    {
      tmpOrder[item.name] = {}
      item.size.forEach(function(key) 
      {
        tmpOrder[item.name][key]={
          'updateOrder': false,
          'qty': 0
        }
      });
    });
    this.order.next(tmpOrder)
  }
}
