import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'
import { ProductService } from 'src/app/services/product.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-admin-menu',
  templateUrl: 'admin-menu.component.html',
  //providers: [DataService],
  styles: [
    `.mainDiv {justify-content: space-between;}`,
    `mat-card {margin: 15px;}`,

    `/* Style inputs with type="text", select elements and textareas */
    input[type=text], select, textarea {
      width: 25%;
      padding: 6px; /* Some padding */ 
      border: 1px solid #ccc; /* Gray border */
      border-radius: 7px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 6px; /* Bottom margin */
    }`,
    `/* Style inputs with type="text", select elements and textareas */
    mat-checkbox {
      width: 25%;
      padding: 8px; /* Some padding */ 
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 6px; /* Bottom margin */
    }`
  ]
})
export class AdminMenuComponent {

  availableProductsLocal;
  avilableProducts;
  addItemToMenu: any;
  productList: any = [];


  //menuGroup: any;
  menuGroupArray: any;
  listWithDetailsTest: any = [];

  displayedColumns = ['size', 'price']

  constructor(private formBuilder: FormBuilder, 
              private __productService: ProductService,
              private __menuService: MenuService) 
  {

    this.__productService.getProducts().subscribe(value => {
      this.availableProductsLocal=value;
    });  

    this.menuGroupArray = new FormArray([]);

    this.availableProductsLocal.forEach( item => {
      
      let menuGroup = this.formBuilder.group({
        0: this.formBuilder.group({"size": item['cans'], 
                                   "price": new FormControl(
                                            {value: item['cansPrice'], disabled: !item['cans']},
                                            [Validators.required, Validators.pattern("^[0-9]*$")])
        }),
        1: this.formBuilder.group({"size": item['halves'], 
                                   "price": new FormControl(
                                            {value: item['halvesPrice'], disabled: !item['halves']},
                                            [Validators.required, Validators.pattern("^[0-9]*$")])
        }),
        2: this.formBuilder.group({"size": item['thirds'], 
                                   "price": new FormControl(
                                            {value: item['thirdsPrice'], disabled: !item['thirds']},
                                            [Validators.required, Validators.pattern("^[0-9]*$")])
        })
      });
      this.menuGroupArray.push(menuGroup)

      this.listWithDetailsTest.push({
        'name': item.name,
        'productId': item.id,
        'sizeData': [{"size": "Can's", "price": item['cansPrice'], "available": item['cans']}, 
                     {"size": "1/2's", "price": item['halvesPrice'], "available": item['halves']}, 
                     {"size": "1/3's", "price": item['thirdsPrice'], "available": item['thirds']}]
      })
    });

    console.log('this.menuGroupArray::', this.menuGroupArray)
    console.log('this.listWithDetailsTest::', this.listWithDetailsTest)
  }


  onSubmit(eachItem)
  {
    //console.log('this.menuGroup', this.menuGroup)
    console.log('eachItem', eachItem)
    this.__productService.showProductList()
  }


  selectDialogOptions(event: any, element: string, eachItem: any, rowIndex:any) 
  {
    element['available'] = !element['available']
    this.__menuService.showMenu()
    this.__productService.showProductList()

    if (rowIndex.controls.price.status === "DISABLED")
      rowIndex.controls.price.enable()
    else
      rowIndex.controls.price.disable()
  }


  onSave(element: string) 
  {
    console.log('element:', element)
  }
}
