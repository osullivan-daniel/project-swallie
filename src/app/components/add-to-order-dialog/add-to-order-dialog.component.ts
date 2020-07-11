import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-add-to-order-dialog',
  templateUrl: 'add-to-order-dialog.component.html', 
  styles: [
    `#itemSelect: {float:left; }`,

    `#quantitySelect {
      width:50px !important;
      float:right !important;
    } `

  ]
})

export class AddToOrderDialogComponent implements OnInit{

  enabledDisabledOptions: any;
  order: any = {};
  availableToOrder: any;
  disableOrderButton: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _data: DataService) { 

    this._data.enabledDisabledDialogOptions.subscribe(value => {
      this.enabledDisabledOptions=value;
    });
  }

  public selectDialogOptions(size, amount, type) {
    console.log('name:', size)
    console.log('amount:', amount)
    console.log(this.enabledDisabledOptions[this.data.name])


    if (type == 'check')
    {
      this.enabledDisabledOptions[this.data.name][size]['dropdown'] = !this.enabledDisabledOptions[this.data.name][size]['dropdown']
    }


    console.log(typeof(size))
    // if you unselect the checkbox the size is undefined
    if (amount == undefined)
    //if (size.localeCompare('undefined'))
    {
      console.log('undefined:', amount)
      this.order[this.data.name] = {}
      this.disableOrderButton = true;
    }
    else 
    {
      console.log('amount issue', amount)
      this.order[this.data.name][size] = amount
      this.disableOrderButton = false;
    }

    console.log(this.order)
  }




  public placeOrder(){}

  ngOnInit(){
    console.log('dialog oninit')
    this._data.resetEnabledDisabledOptions()
    this.order[this.data.name] = {}
    this.disableOrderButton = true;
    console.log(this.order)
    // Possible to make this flexable based on the number ordered?
    this.availableToOrder = [1, 2, 3] 
  }
}