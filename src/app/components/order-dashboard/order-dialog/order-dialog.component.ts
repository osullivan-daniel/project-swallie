import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { AdminService } from 'src/app/services/admin.service';
import { Product } from 'src/app/services/product';
import { Order } from 'src/app/services/order';
import * as moment from 'moment';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: 'order-dialog.component.html',
  styles: [
  `#deleteIcon {
    cursor: pointer; 
  }`,
  `
  #submit {
      float: left !important;
  }`,
  `
  #back {
      float: right !important;
  }`,

` .mat-cell {
    padding: 0 8px 8px 0;
  }`,

`.mat-column-username {
    flex: 0 0 40% !important;
    width: 40% !important;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    justify-content:right;
  }`,
  
  `.mat-column-size {
    flex: 0 0 20% !important;
    width: 20% !important;
  }`,

  `.mat-column-qty {
    flex: 0 0 15% !important;
    width: 15% !important;
  }`,

  `.mat-column-remove {
    flex: 0 0 15% !important;
    width: 15% !important;
  }`,

  `.button-div {
    padding-top: 10px;
    padding-bottom: 10px !important;
  }
  `

  ]
})
export class OrderDialogComponent implements OnInit {

  orderObject: Array<any> = []; // local copy of what is in the order
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
      console.log(each['name'])
      reset.push(each['name'])
      // const clone = Object.assign( {}, each );
      // itemList.push(Object.setPrototypeOf( clone, Product.prototype ));
    }
    //let orderData = JSON.parse(JSON.stringify(this.orderObjectForDisplay.data))

    this.__menuService.resetProducts(reset)
    let orderData = JSON.parse(JSON.stringify(this.orderObjectForDisplay.data))
    
    // TODO:: if i ever need items to be type Product
    //let itemList = []
    // for(const each of this.orderObjectForDisplay.data)
    // {
    //   const clone = Object.assign( {}, each );
    //   itemList.push(Object.setPrototypeOf( clone, Product.prototype ));
    // }
    // console.log(itemList)

    let newOrderObject = new Order('1', 'Daniel', moment().format('MMMM Do YYYY, HH:mm:ss'), orderData)


    // let orderQue = this.__adminService.ordersInQueue.value
    // let orderNum = this.__adminService.currentOrderNumber.value
    // let orderDetails = this.__adminService.orderDetailsForAll.value

    // let order = JSON.parse(JSON.stringify(this.orderObjectForDisplay.data))
    


    for (const each of this.orderObjectForDisplay.data) 
    {
      console.log(each)
      each['addToOrder'] = false
      each['qty'] = 0
      //value['orderNum'] = orderNum
    }

    //console.log(order)


    // //console.log(orderQue)
    // orderQue.push(order)
    // //console.log(orderQue)


    // //console.log(orderNum)
    // //console.log(orderDetails)

    // this.__adminService.updateOrderQue(orderQue)
    // this.__adminService.updateOrderDetails(orderDetails)
    // this.__adminService.updateOrderNum(orderNum+1)

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


