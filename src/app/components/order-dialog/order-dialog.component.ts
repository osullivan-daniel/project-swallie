import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-order-dialog',
  templateUrl: 'order-dialog.component.html',
  // `
  //   <p>
  //     order-dialog works!
  //   </p>
  // `,
  styles: [

  // `
  // // .mat-dialog-content {
  // //     width: 300px !important;
  // // }`,
  

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
    padding: 8px 8px 8px 0;
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

// `  .mat-cell {
//     text-align: center;
//     justify-content:center;
//   }`,

// `  .icon {
//     line-height: unset;
//  }`

  ]
})
export class OrderDialogComponent implements OnInit {

  order: any;
  orderForDisplay: any;
  displayedColumns = ['name', 'size', 'qty', 'remove'];
  //dataSource = ELEMENT_DATA;
  //ELEMENT_DATA: orderForDisplay[] = this.createOrderForDIsplay(this.order) 

  constructor(private _orderService: OrderService) 
  {
    this._orderService.order.subscribe(value => {this.order=value}); 
  }

  public createOrderForDIsplay(data:any) 
  {
    let i = 0;
    let tmpOrder = [];
    for (const [key, value] of Object.entries(data)) 
    {
      for (const [innerKey, innerValue] of Object.entries(value))
      {
        if (innerValue['updateOrder'] === true)
        {
          i++;
          tmpOrder.push({'id':i, 'name': key, 'size': innerKey, 'qty': innerValue['qty']})
        }
      }
    }
    return tmpOrder;
  }

  public removeItem(id): void
  {
    //this.orderForDisplay.deletePost(id);

    delete this.orderForDisplay[id-1]
    // console.log(this.orderForDisplay)
  }

  ngOnInit(): void 
  {
    this.orderForDisplay = new MatTableDataSource(this.createOrderForDIsplay(this.order));
    // console.log(this.orderForDisplay)
  }
}





// <table mat-table [datasource]="orderForDisplay">
