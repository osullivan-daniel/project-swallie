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
  order: any = {};
  availableToOrder: any;
  disableOrderButton: boolean;
  orderServiceOrder: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<any>, private _orderService: OrderService) 
  {
    this._orderService.order.subscribe(value => {this.orderServiceOrder=value});    
  }

  public enableDisableOrderButton()
  {
    let orderStatus = []
    for(let key in this.data.order)
    {
      if (this.data.order[key]['updateOrder'] === true && this.data.order[key]['qty'] > 0)
      {
        orderStatus.push('Valid')
      }
      else if (this.data.order[key]['updateOrder'] === false)
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
    this.data.order[size]['updateOrder'] = event.checked
    this.enableDisableOrderButton()
  }

  public selectDropdownValue(size: string, qty: number)
  {
    this.data.order[size]['qty'] = qty
    this.enableDisableOrderButton()
  }

  public onSave() {
    this.dialogRef.close(this.data)
  }

  ngOnInit(){
    this.sizeOptions = Object.keys(this.data.order)
    this.enableDisableOrderButton();
    this.availableToOrder = [1, 2, 3] 
    console.log(this.orderServiceOrder)
  }
}