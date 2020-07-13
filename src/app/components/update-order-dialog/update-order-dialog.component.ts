import { Component, OnInit, Inject, ComponentFactoryResolver } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-update-order-dialog',
  templateUrl: 'update-order-dialog.component.html', 
  styles: [
    `#itemSelect: {float:left; }`,

    `#quantitySelect {
      width:50px !important;
      float:right !important;
    } `,

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
      padding: 8px 8px 0;
    }`,

    `.mat-column-size {
      flex: 0 0 50% !important;
      width: 50% !important;
    }`,
  
    `.mat-column-qty {
      flex: 0 0 25% !important;
      width: 25% !important;
    }`,
  
    `.mat-column-remove {
      flex: 0 0 25% !important;
      width: 25% !important;
    }`,

  ]
})

export class updateOrderDialogComponent implements OnInit{

  sizeOptions: any = []
  order: any;
  localOrder: any;
  

  orderObjectForAll: Array<any>;
  objectForOptionsSelections: Array<any> = [];
  orderOptionsForDisplay: any;

  availableToOrder = [1, 2, 3];
  displayedColumns = ['size', 'qty'];
  disableOrderButton: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _orderService: OrderService) {
    this._orderService.order.subscribe(value => {this.order=value});
    this._orderService.orderObjectForAll.subscribe(value => {this.orderObjectForAll=value});
  }


  public getObjectForOptionsSelections()
  {
    for (let each in this.orderObjectForAll) 
    {
      if (this.orderObjectForAll[each]['name'] === this.data) 
      {
        let id = this.orderObjectForAll[each]['id']-1

        this.objectForOptionsSelections.push(JSON.parse(JSON.stringify(this.orderObjectForAll[each])))
      }
    }
    this.orderOptionsForDisplay = new MatTableDataSource(this.objectForOptionsSelections);
  }

  onSave()
  {
    // re-add
    for (let each in this.objectForOptionsSelections)
    {
      this.orderObjectForAll[this.objectForOptionsSelections[each]['id']-1] = this.objectForOptionsSelections[each]
    }
  }

  onBack()
  {
    // console.log('onBack:: orderObjectForAll', this.orderObjectForAll)
    // Do nothing - we will not update objectForOptionsSelections
  }

  public enableDisableOrderButton()
  {
    this.disableOrderButton = false

    for (const [key, value] of Object.entries(this.objectForOptionsSelections)) 
    {
      if (value['addToOrder'] === true && value['qty'] === 0)
      {
        this.disableOrderButton = true
      }
    }


    // let orderStatus = []

    // for(let key in this.objectForOptionsSelections)
    // {
    //   let localVar = this.objectForOptionsSelections[key]
    
    //   if (localVar['addToOrder'] === true && localVar['qty'] > 0)
    //   {
    //     orderStatus.push('Valid')
    //   }
    //   else if (localVar['addToOrder'] === false)
    //   {
    //     orderStatus.push('Empty')
    //   }
    //   else
    //   {
    //     orderStatus.push('Invalid')
    //   }
    // }
    // let uniqueOrderValues = new Set(orderStatus)
 
    // if (Array.from(uniqueOrderValues).includes('Invalid')) {this.disableOrderButton = true}
    // else if (Array.from(uniqueOrderValues).length == 1 && Array.from(uniqueOrderValues).includes('Empty')) {this.disableOrderButton = true}
    // else {this.disableOrderButton = false}
  }

  public selectDialogOptions(event: any, size: string) 
  {
    console.log('element::', size)
    for (const [key, value] of Object.entries(this.objectForOptionsSelections)) 
    {
      if (value['size'] === size)
      {
        value['addToOrder'] = event.checked
      }
    }
    this.enableDisableOrderButton()
  }

  public selectDropdownValue(size: string, qty: number)
  {
    for (const [key, value] of Object.entries(this.objectForOptionsSelections)) 
    {
      if (value['size'] === size)
      {
        value['qty'] = qty
      }
    }
    this.enableDisableOrderButton()
  }

  public removeItem(id: number)
  {
    for (const [key, value] of Object.entries(this.objectForOptionsSelections)) 
    {
      if (value['id'] === id)
      {
        value.qty = 0;
        value.addToOrder = false
      }
    }
    // this.enableDisableOrderButton()
  }



  

  ngOnInit() {
    this.getObjectForOptionsSelections()
    //this.enableDisableOrderButton()
  }
}