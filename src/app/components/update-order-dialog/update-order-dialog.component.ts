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
    #update {
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

    `.button-div {
      padding-top: 10px;
      padding-bottom: 10px !important;
    }`
  ]
})

export class updateOrderDialogComponent implements OnInit{

  //sizeOptions: any = []
  //order: any;
  //localOrder: any;
  

  orderObjectForAll: Array<any>;
  objectForOptionsSelections: Array<any> = [];
  orderOptionsForDisplay: any;

  availableToOrder = [1, 2, 3];
  displayedColumns = ['size', 'qty'];
  disableOrderButton: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _orderService: OrderService) {
    //this._orderService.order.subscribe(value => {this.order=value});
    this._orderService.orderServiceObjectForAll.subscribe(value => {this.orderObjectForAll=value});
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
  }

  public selectDialogOptions(event: any, size: string) 
  {
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

  ngOnInit() {
    this.getObjectForOptionsSelections()
  }
}