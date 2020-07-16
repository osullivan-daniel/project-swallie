import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../services/product';
import { DataService } from '../../../services/data.service';
import { MatTableDataSource } from '@angular/material/table'


@Component({
  selector: 'app-admin-menu',
  templateUrl: 'admin-menu.component.html',
  styles: [
  ]
})
export class AdminMenuComponent implements OnInit {

  availableProductsLocal;
  avilableProducts;
  displayedColumns = ['size', 'price']

  constructor(private formBuilder: FormBuilder, private _data: DataService) 
  {
    // this.newProductForm = this.formBuilder.group(new Product(null,null,null,null,null)); 

    this._data.productList.subscribe(value => {
      this.availableProductsLocal=value;
    });  
  }

  onSubmit(newProduct) 
  {
    // this.availableProductsLocal.push(newProduct.value as Product);
  }


  ngOnInit(): void {
    this.avilableProducts = new MatTableDataSource(this.availableProductsLocal);
    console.log(this.avilableProducts)
  }
}
