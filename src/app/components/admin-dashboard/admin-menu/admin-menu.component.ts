import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'
import { ProductService } from 'src/app/services/product.service';
//import { DataService } from 'src/app/services/data.service';


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
export class AdminMenuComponent implements OnInit {

  availableProductsLocal;
  avilableProducts;
  // displayedColumns = ['size', 'price']

  // defaultInnerValues = {}

  // sizes = ["Can's", "1/2's", "1/3's"]

  displayedColumns = ['size', 'price']
  sizeData = [{"size": "Can's", "price": "", "available":false}, 
              {"size": "1/2's", "price": "", "available":false}, 
              {"size": "1/3's", "price": "", "available":false}]

  constructor(private formBuilder: FormBuilder, private __productService: ProductService) 
  {
    // this.newProductForm = this.formBuilder.group(new Product(null,null,null,null,null)); 
    this.__productService.getProducts().subscribe(value => {
      this.availableProductsLocal=value;
    });  

    this.avilableProducts = new MatTableDataSource(this.availableProductsLocal);
  }

  onSubmit(newProduct) 
  {
    // this.availableProductsLocal.push(newProduct.value as Product);
  }

  public selectDialogOptions(event: any, size: string) 
  {
    //console.log(event)
    // for (const [key, value] of Object.entries(this.objectForOptionsSelections)) 
    // {
    //   if (value['size'] === size)
    //   {
    //     value['addToOrder'] = event.checked
    //   }
    // }
    // this.enableDisableOrderButton()
  }


  ngOnInit(): void {
    //console.log(this.avilableProducts)
  }
}
