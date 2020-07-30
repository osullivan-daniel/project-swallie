import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  // displayedColumns = ['size', 'price']

  // defaultInnerValues = {}

  // sizes = ["Can's", "1/2's", "1/3's"]

  displayedColumns = ['size', 'price']
  // sizeData = [{"size": "Can's", "price": "", "available":false}, 
  //             {"size": "1/2's", "price": "", "available":false}, 
  //             {"size": "1/3's", "price": "", "available":false}]

  constructor(private formBuilder: FormBuilder, 
              private __productService: ProductService,
              private __menuService: MenuService) 
  {
    // this.newProductForm = this.formBuilder.group(new Product(null,null,null,null,null)); 
    this.__productService.getProducts().subscribe(value => {
      this.availableProductsLocal=value;
    });  


    console.log('test::', this.availableProductsLocal)

    let listWithDetailsTest = [];
    this.availableProductsLocal.forEach( item => {
      
      listWithDetailsTest.push({
        'name': item.name,
        'sizeData': [{"size": "Can's", "price": item['cansPrice'], "available": item['cans']}, 
                     {"size": "1/2's", "price": item['halvesPrice'], "available": item['halves']}, 
                     {"size": "1/3's", "price": item['thirdsPrice'], "available":item['thirds']}]
      })

    });

    this.avilableProducts = listWithDetailsTest;
    //this.avilableProducts = new MatTableDataSource(this.availableProductsLocal);
  }
  // (input)='onSubmit(element, eachItem, value)'
  onSubmit(event: any, element: string, eachItem: any, value: any) 
  {
    console.log('event:', event)
    console.log('element:', element)
    console.log('eachItem:', eachItem)
    console.log('value:', value)
    this.__menuService.showMenu()
    this.__productService.showProductList()

    // this.availableProductsLocal.push(newProduct.value as Product);
  }

  selectDialogOptions(event: any, element: string, eachItem: any) 
  {
    element['available'] = !element['available']
    this.__menuService.showMenu()
    this.__productService.showProductList()

    console.log('element:', element)
    console.log('eachItem:', eachItem)
  }

  onSave(element: string) 
  {
    console.log('element:', element)
  }
}
