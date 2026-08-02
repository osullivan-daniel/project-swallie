import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  orderServiceObjectForAll = new BehaviorSubject<any[]>([]);

  public createOrderObjectForAll(data: any): void {
    let i = 0;
    const tmpOrder: any[] = [];
    for (const [key, value] of Object.entries(data)) {
      for (const [innerKey, innerValue] of Object.entries((value as any)['size'])) {
        i++;
        tmpOrder.push({
          id: i,
          name: (value as any)['name'],
          size: innerValue,
          qty: 0,
          addToOrder: false
        });
      }
    }
    this.orderServiceObjectForAll.next(tmpOrder);
  }
}
