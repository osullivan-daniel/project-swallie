import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: 'update-order-dialog.component.html', 
  styles: [
    `#itemSelect: {float:left; }`,

    `#quantitySelect {
      width:50px !important;
      float:right !important;
    } `

  ]
})

export class updateOrderDialogComponent implements OnInit{

  sizeOptions: any = []
  order: any;
  localOrder: any;
  availableToOrder: any;
  disableOrderButton: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _orderService: OrderService) 
  {
    this._orderService.order.subscribe(value => {this.order=value});    
  }

  public enableDisableOrderButton()
  {
    let orderStatus = []
    for(let key in this.localOrder)
    {
      if (this.localOrder[key]['updateOrder'] === true && this.localOrder[key]['qty'] > 0)
      {
        orderStatus.push('Valid')
      }
      else if (this.localOrder[key]['updateOrder'] === false)
      {
        orderStatus.push('Empty')
      }
      else
      {
        orderStatus.push('Invalid')
      }
    }

    let uniqueOrderValues = new Set(orderStatus)
 
    if (Array.from(uniqueOrderValues).includes('Invalid')) {this.disableOrderButton = true}
    else if (Array.from(uniqueOrderValues).length == 1 && Array.from(uniqueOrderValues).includes('Empty')) {this.disableOrderButton = true}
    else {this.disableOrderButton = false}
  }

  public selectDialogOptions(event: any, size: string) 
  {
    this.localOrder[size]['updateOrder'] = event.checked
    this.enableDisableOrderButton()

    console.log('localOrder::', this.localOrder)
    console.log('order::', this.order)
  }

  public selectDropdownValue(size: string, qty: number)
  {
    this.localOrder[size]['qty'] = qty
    this.enableDisableOrderButton()
  }

  public onSave() {
    console.log('calling onSave')
    this.order[this.data] = this.localOrder
  }

  ngOnInit(){
    console.log('what the fluff::', this.order[this.data])
    this.localOrder  = JSON.parse(JSON.stringify(this.order[this.data]));

    this.sizeOptions = Object.keys(this.localOrder)
    this.enableDisableOrderButton();
    // TODO:: Figure our what to do with this.... -> load from file with styling???
    this.availableToOrder = [1, 2, 3] 
    
  }
}