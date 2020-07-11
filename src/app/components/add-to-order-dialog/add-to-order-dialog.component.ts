import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  sizeOptions: any = []
  order: any = {};
  availableToOrder: any;
  disableOrderButton: boolean;
  disabledDropdownOptions: any;

  testingHere;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
              private _data: DataService,
              private dialogRef: MatDialogRef<any>) { 

    this._data.disabledDropdownOptions.subscribe(value => {
      this.disabledDropdownOptions=value;
    });

  }

  public enableDisableOrderButton()
  {
    console.log('enableDisableOrderButton()::', this.data.order)

    let tmpBooleanList = []
    for(let key in this.data.order)
    {
      //valid entry
      if (this.data.order[key]['addToOrder'] === true && this.data.order[key]['amount'] > 0)
      {
        tmpBooleanList.push(false)
      }
      else if (this.data.order[key]['addToOrder'] === false)
      {
        tmpBooleanList.push(false)
      }
      else
      {
        tmpBooleanList.push(true)
      }
    }

    console.log("tmpBooleanList::", tmpBooleanList)
    this.disableOrderButton = true ? tmpBooleanList.includes(true) : false
  }

  public selectDialogOptions(event: any, size: string) 
  {
    this.disabledDropdownOptions[this.data.name][size] = !this.disabledDropdownOptions[this.data.name][size]
    this.data.order[size]['addToOrder'] = event.checked
    this.enableDisableOrderButton()
  }


  public selectDropdownValue(size: string, amount: number)
  {
    this.data.order[size]['amount'] = amount
    this.enableDisableOrderButton()
  }

  // onClose(): void {
  //   this.dialogRef.close(this.data);
  // }

  public onSave() {
    console.log('onsave::', this.data)
    this.dialogRef.close(this.data)
  }

  ngOnInit(){
    console.log('dialog oninit');
    console.log('this.data::', this.data);
    this.sizeOptions = Object.keys(this.data.order)
    this._data.resetDisabledDropdowns();
    this.enableDisableOrderButton();
    this.availableToOrder = [1, 2, 3] 
  }
}