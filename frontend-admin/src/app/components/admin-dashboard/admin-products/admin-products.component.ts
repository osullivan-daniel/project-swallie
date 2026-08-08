import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'shared-services';
import { ProductService } from '../../../services/product.service'
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-admin-products',
    templateUrl: 'admin-products.component.html',
    styleUrls: ['admin-products.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:[ReactiveFormsModule]
})
export class AdminProductsComponent implements OnInit 
{
  formCompleted:boolean = true;
  newProductForm: any;
  styleList = ["IPA", "TIPA", "Stout"]

  availableProductsLocal: Array<Product> = []
  
  constructor(private formBuilder: UntypedFormBuilder, private _productService: ProductService) 
  {
    this.newProductForm = this.formBuilder.group({'name': '','style': '','abv': '', 'imgUrl': ''}); 
  }

  
  onSubmit(newProduct) 
  {
    let newProductObject = new Product(uuid(), newProduct.value.name, newProduct.value.style, newProduct.value.abv, newProduct.value.imgUrl)
    this._productService.addProduct(newProductObject)
    this.newProductForm.reset();
  }


  ngOnInit(): void {
    this._productService.getProducts().subscribe(value => this.availableProductsLocal = value);
  }
}


