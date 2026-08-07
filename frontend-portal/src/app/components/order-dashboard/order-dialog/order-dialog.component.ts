import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { AdminService } from 'src/app/services/admin.service';
import { Product } from 'shared-services';
import { Order } from 'src/app/services/order';
import { MenuService } from '../../../../../../libs/shared-services/src/lib/models/menu.service';
import { format } from 'date-fns';


@Component({
    selector: 'app-order-dialog',
    templateUrl: 'order-dialog.component.html',
    styleUrls: ['order-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OrderDialogComponent implements OnInit {

  orderObject: any = []; // local copy of what is in the order
  orderObjectForAll: any; // How we interact with oderservice
  orderObjectForDisplay: any; // MatTableDataSource for display
  total: number = 0; //total price of order

  displayedColumns: Array<string> = ['name', 'size', 'qty', 'remove'];

  constructor(@Inject(MAT_DIALOG_DATA) public __dialogData: any, 
              private __adminService: AdminService,
              private dialogRef: MatDialogRef<OrderDialogComponent>,
              private __menuService: MenuService) {}


  onSave()
  {
    let reset: Array<string> = [];
    for(const each of this.orderObjectForDisplay.data)
    {
      reset.push(each['name'])
    }

    this.__menuService.resetProducts(reset)
    let orderData = JSON.parse(JSON.stringify(this.orderObjectForDisplay.data))
    


    let newOrderObject = new Order('1', 'Daniel', format(new Date(), 'MMMM do yyyy, HH:mm:ss'), orderData)
    console.log(newOrderObject)


    for (const each of this.orderObjectForDisplay.data) 
    {
      each['addToOrder'] = false
      each['qty'] = 0
    }

    this.__adminService.updateOrderQue(newOrderObject)
    this.dialogRef.close()
  }


  onBack()
  {
    this.dialogRef.close(false)
  }


  public createorderObjectForDisplay(data:any): void
  {
    let order = []
    for (const [key, value] of Object.entries(data)) 
    {
      for (const [innerKey, innerValue] of Object.entries(value['orderDetails'])) 
      {
        if (innerValue['addToOrder'] == true)
        {
          this.total += innerValue['qty']*innerValue['price']
          order.push({'name': value['name'], 'size': innerValue['size'], 'qty': innerValue['qty'], 'addToOrder': innerValue['addToOrder']})
        }
      }
    }
    this.orderObjectForDisplay = new MatTableDataSource(order);
  }

  public removeItem(item): void
  {
    this.total = 0;
    for (const [key, value] of Object.entries(this.__dialogData)) 
    {
      if (value['name'] === item['name'])
      {
        for (const [innerKey, innerValue] of Object.entries(value['orderDetails'])) 
        {
          if (innerValue['size'] === item['size'])
          {
            innerValue['addToOrder'] = false
          }
        }
      }
    }
    this.createorderObjectForDisplay(this.__dialogData)
  }

  ngOnInit(): void 
  {
    this.createorderObjectForDisplay(this.__dialogData)
  }
}


