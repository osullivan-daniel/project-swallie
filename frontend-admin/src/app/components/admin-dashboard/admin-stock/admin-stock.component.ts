
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormArray } from '@angular/forms';

import { MenuService } from 'shared-services';
import { ProductService } from '../../../services/product.service';

@Component({
    selector: 'app-admin-stock',
    templateUrl: 'admin-stock.component.html',
    styleUrls: ['admin-stock.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCardModule, MatTableModule, MatCheckboxModule, MatButtonModule, FormsModule, ReactiveFormsModule]
})

export class AdminStockComponent {

  availableProductsLocal: any;
  avilableProducts: any;
  addItemToMenu: any;
  productList: any = [];


  //menuGroup: any;
  menuGroupArray: any;
  listWithDetailsTest: any = [];

  displayedColumns = ['size', 'price']

  constructor(private formBuilder: UntypedFormBuilder, 
              private __productService: ProductService,
              private __menuService: MenuService) 
  {

    this.__productService.getProducts().subscribe(value => {
      this.availableProductsLocal=value;
    });  

    this.menuGroupArray = new UntypedFormArray([]);

    this.availableProductsLocal.forEach( item => {
      
      let menuGroup = this.formBuilder.group({
        0: this.formBuilder.group({"size": item['cans'], 
                                   "price": new UntypedFormControl(
                                            {value: item['cansPrice'], disabled: !item['cans']})
        }),
        1: this.formBuilder.group({"size": item['halves'], 
                                   "price": new UntypedFormControl(
                                            {value: item['halvesPrice'], disabled: !item['halves']})
        }),
        2: this.formBuilder.group({"size": item['thirds'], 
                                   "price": new UntypedFormControl(
                                            {value: item['thirdsPrice'], disabled: !item['thirds']})
        })
      });
      this.menuGroupArray.push(menuGroup)

      this.listWithDetailsTest.push({
        'name': item.name,
        'productId': item.productId,
        'updateButtonVisable': false, 
        'sizeData': [{"size": "Can's", "price": item['cansPrice'], "available": item['cans']}, 
                     {"size": "1/2's", "price": item['halvesPrice'], "available": item['halves']}, 
                     {"size": "1/3's", "price": item['thirdsPrice'], "available": item['thirds']}]
      })
    });
  }


  onSubmit(item)
  {
    item.updateButtonVisable = false;
    let product = this.__productService.getProductById(item.productId)

    item.sizeData.forEach(each => {
      if(each.size === "Can's")
      {
        product.cans = each.available
        product.cansPrice = each.price
      }
      else if(each.size === "1/2's")
      {
        product.halves = each.available
        product.halvesPrice = each.price
      }
      else if(each.size === "1/3's")
      {
        product.thirds = each.available
        product.thirdsPrice = each.price
      }
    });

    this.__menuService.load(this.__productService.getProducts())
  }


  selectDialogOptions(item: any, row: any, rowObject:any, formGroup:any) 
  {
    row['available'] = !row['available']

    if (rowObject.controls.price.status === "DISABLED")
      rowObject.controls.price.enable()
    else
      rowObject.controls.price.disable()

    item.updateButtonVisable = this.checkUpdateProductButton(item.sizeData)
  }


  enterText(item: any, row: any, rowObject: any, formGroup:any)
  {
    row['price'] = rowObject.controls.price.value
    item.updateButtonVisable = this.checkUpdateProductButton(item.sizeData)
  }


  checkUpdateProductButton(input: any): boolean
  {
    let visable = true
    input.forEach(item => {
      if (item.available == true)
      {
        if (item.price == null || item.price == 0)
        {
          visable = false
        }
      }
    })
    return visable
  }
}
