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

  orderObject: Array<any> = [] // local copy of what is in the order
  orderObjectForAll: any; // How we interact with oderservice
  orderObjectForDisplay: any; // MatTableDataSource for display
  
  displayedColumns: Array<string> = ['name', 'size', 'qty', 'remove'];
  //dataSource = ELEMENT_DATA;
  //ELEMENT_DATA: orderObjectForDisplay[] = this.createorderObjectForDisplay(this.order) 

  constructor(private _orderService: OrderService) 
  {
    this._orderService.orderServiceObjectForAll.subscribe(value => {this.orderObjectForAll = value;}); 
  }

  public createorderObjectForDisplay(data:any): void
  {
    for (const [key, value] of Object.entries(data)) 
    {
      if (value['addToOrder'] === true && value['qty'] > 0)
      {
        this.orderObject.push(value)
      }
    }
  }

  public removeItem(id): void
  {
    console.log('id::', id)

    let orderObjectForAllIndex = this.orderObject[id-1]['id']
    console.log('orderObjectForAllIndex::', orderObjectForAllIndex)

    this.orderObject = this.orderObject.splice(this.orderObject[id-1],this.orderObject[id-1])
    //delete this.orderObject[id-1]

    console.log(this.orderObject)

    this.orderObjectForDisplay = new MatTableDataSource(this.orderObject);

    console.log(this.orderObjectForDisplay)

    // for (const [key, value] of Object.entries(this.orderObjectForDisplay.value)) 
    // {
    //   console.log('value::', value)
    // }

    // delete this.orderObject[id-1]
    // console.log(this.orderObjectForDisplay[id-1])
    // delete this.orderObjectForDisplay[id-1]
    // console.log(this.orderObjectForDisplay)
  }

  ngOnInit(): void 
  {
    this.createorderObjectForDisplay(this.orderObjectForAll)
    this.orderObjectForDisplay = new MatTableDataSource(this.orderObject);
  }
}