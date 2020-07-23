import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'
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

export class updateOrderDialogComponent implements OnInit
{
  localOrder: any;
  orderOptionsForDisplay: any;

  availableToOrder = [1, 2, 3];
  // displayedColumns = ['size', 'qty', 'price'];
  displayedColumns = ['size', 'qty'];

  disableOrderButton: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<updateOrderDialogComponent>) {}


  public getObjectForOptionsSelections(selectedItem): any
  {
    let objectForOptionsSelections = []

    for (let each in selectedItem) 
    {
      console.log(selectedItem[each])
      objectForOptionsSelections.push(JSON.parse(JSON.stringify(selectedItem[each])))
    }
    return new MatTableDataSource(objectForOptionsSelections);
  }

  onSave()
  {
    //this.data.orderDetails = JSON.parse(JSON.stringify(this.localOrder)) 
    this.dialogRef.close(this.localOrder)
  }

  onBack()
  {
    // Do nothing - we will not update objectForOptionsSelections
  }

  public enableDisableOrderButton()
  {
    this.disableOrderButton = false

    for (const [key, value] of Object.entries(this.localOrder)) 
    {
      if (value['addToOrder'] === true && value['qty'] === 0)
      {
        this.disableOrderButton = true
      }
    }
    this.orderOptionsForDisplay = this.getObjectForOptionsSelections(this.localOrder)
  }

  public selectDialogOptions(event: any, size: string) 
  {
    for (const [key, value] of Object.entries(this.localOrder)) 
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
    for (const [key, value] of Object.entries(this.localOrder)) 
    {
      if (value['size'] === size)
      {
        value['qty'] = qty
      }
    }
    this.enableDisableOrderButton()
  }

  ngOnInit() 
  {
    this.localOrder = JSON.parse(JSON.stringify(this.data.orderDetails))
    this.orderOptionsForDisplay = this.getObjectForOptionsSelections(this.localOrder)
  }
}