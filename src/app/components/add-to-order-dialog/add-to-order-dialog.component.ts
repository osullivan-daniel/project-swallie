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

  order: any = {};
  availableToOrder: any;
  disableOrderButton: boolean;
  disabledDropdownOptions: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _data: DataService) { 

    this._data.disabledDropdownOptions.subscribe(value => {
      this.disabledDropdownOptions=value;
    });
  }

  // public showOptions(test, key, num) {
  //   console.log(test.checked);
  //   console.log(key);
  //   console.log(num);
  // }

  public enableDisableOrderButton()
  {

    //console.log('this.order::', this.order[size])


    let tmpBoolean = true
    for(let key in this.order)
    {
      if (this.order[key]['addToOrder'] === true && this.order[key]['amount'] != 0)
      {
        tmpBoolean = false
      }
    }

    this.disableOrderButton = tmpBoolean;

    // if (Object.keys(this.order).length != 0) 
    // {
    //   // this.order.forEach(element => 
    //   // {
    //   //   console.log('element::', element)
    //   // });

    //   let tmpBoolean = true
    //   for(let key in this.order)
    //   {
    //     if (this.order[key]['addToOrder'] = true)
    //     {
    //       tmpBoolean = false
    //     }
    //   }

    //   this.disableOrderButton = tmpBoolean

    //   // this.order.forEach(function(size) 
    //   // {
    //   //   console.log('function::', size)
    //   // });

    //   // console.log('enableDisableOrderButton')
    //   // if (this.order == {})
    //   // {
    //   //   console.log('enableDisableOrderButton:', this.order)
    //   // }
    // }
  }

  public createOrder(size: any) 
  {
    for(let key in size)
    {
      console.log(size[key])
      this.order[size[key]]={
        'addToOrder': false,
        'amount': 0
      }
    }
  }


  public selectDialogOptions(event: any, size: string, amount: number) 
  {
    this.disabledDropdownOptions[this.data.name][size] = !this.disabledDropdownOptions[this.data.name][size]

    console.log(size)
    console.log(event.checked)

    this.order[size]['addToOrder'] = event.checked
    this.enableDisableOrderButton()
  }


  public selectDropdownValue(key: string, size: number)
  {
    this.order[key]['amount'] = size
    console.log('this.order::', this.order)
    this.enableDisableOrderButton()
  }

  ngOnInit(){
    console.log('dialog oninit');
    console.log(this.data);

    this._data.resetDisabledDropdowns();
    this.enableDisableOrderButton();
    this.createOrder(this.data.size);
    this.availableToOrder = [1, 2, 3] 
  }
}