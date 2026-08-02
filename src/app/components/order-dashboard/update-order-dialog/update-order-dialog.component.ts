import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'

@Component({
    selector: 'app-update-order-dialog',
    templateUrl: 'update-order-dialog.component.html',
    styleUrls: ['update-order-dialog.component.css'],
    standalone: false
})

export class updateOrderDialogComponent implements OnInit
{
  localOrder: any;
  orderOptionsForDisplay: any;
  disableOrderButton: boolean = true;

  availableToOrder = [1, 2, 3];
  displayedColumns = ['size', 'qty', 'price'];


  constructor(@Inject(MAT_DIALOG_DATA) public __dialogData: any, private dialogRef: MatDialogRef<updateOrderDialogComponent>) {}


  onSave()
  {
    this.dialogRef.close(this.localOrder)
  }


  onBack()
  {
    this.dialogRef.close(false)
  }


  public getObjectForOptionsSelections(selectedItem): any
  {
    let objectForOptionsSelections = []

    for (let each in selectedItem) 
    {
      objectForOptionsSelections.push(JSON.parse(JSON.stringify(selectedItem[each])))
    }
    return new MatTableDataSource(objectForOptionsSelections);
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
    console.log(this.__dialogData)
    this.localOrder = JSON.parse(JSON.stringify(this.__dialogData.orderDetails))
    this.orderOptionsForDisplay = this.getObjectForOptionsSelections(this.localOrder)
  }
}