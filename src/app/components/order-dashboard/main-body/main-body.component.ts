import { Component, OnInit } from '@angular/core';
import { MenuBodyService } from '../../../services/menu-body.service';
//import { DataService } from '../../../services/data.service';
import { updateOrderDialogComponent } from '../update-order-dialog/update-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
// import { ProductService } from 'src/app/services/product.service';


@Component({
    selector: 'app-main-body',
    templateUrl: 'main-body.component.html',
    styleUrls: ['main-body.component.css'],
    standalone: false
})


export class MainBodyComponent implements OnInit {
  
  displayMenuIcon!:string;
  backgroundColour!: string;
  order: any = {};

  selectedSubMenu!: null;
  availableSelectedMenu: any; 
  selectedOption: any;

  constructor(private _menuBody: MenuBodyService, 
              public dialog: MatDialog, 
              private __menuService: MenuService)
    {
    this._menuBody.menuIconVisibilityChange.subscribe(value => {
      this.displayMenuIcon = value ? 'visible' : 'hidden'
    });

    this.__menuService.selectedSubMenu.subscribe(value => {
      this.selectedSubMenu=value;
    });
  }

  public changeMenu(): void {
    this._menuBody.changeMenuVisability()
  }

  public displayupdateCart(selectedItem: { name: any; orderDetails: any; }): void 
  {
    //console.log(selectedItem)
    let dialogRef = this.dialog.open(updateOrderDialogComponent, 
    { 
      disableClose: true,
      width: '400px',
      maxWidth: 'calc(100vw - 32px)',
      data: {'name':selectedItem.name,
             'orderDetails':selectedItem.orderDetails}
    });

    dialogRef.afterClosed().subscribe(res => 
    {
      if (!(res === false))
        selectedItem.orderDetails = res
    });
  }

  ngOnInit(): void {
    // To set visability for the first time.
    this.displayMenuIcon = this._menuBody.menuIconVisable ? 'visible' : 'hidden'
  }
}
