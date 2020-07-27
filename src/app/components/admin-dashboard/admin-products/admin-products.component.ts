import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../../services/product';
//import { DataService } from '../../../services/data.service';
import { ProductService } from '../../../services/product.service'
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-admin-products',
  templateUrl: 'admin-products.component.html',
  styles: [   
    `/* Style inputs with type="text", select elements and textareas */
    input[type=text], select, textarea {
      width: 100%; /* Full width */
      padding: 12px; /* Some padding */ 
      border: 1px solid #ccc; /* Gray border */
      border-radius: 7px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 16px; /* Bottom margin */
    }
    
    /* Style the submit button with a specific background color etc */
    input[type=submit] {
      background-color: #4CAF50;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 7px;
      cursor: pointer;
    }
    
    /* When moving the mouse over the submit button, add a darker green color */
    input[type=submit]:hover {
      background-color: #45a049;
    }
    
    /* Add a background color and some padding around the form */
    .div_test {
      border-radius: 5px;
      padding: 25px;
    }`,

    `.button-div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 15px;
  }`

  ]
})
export class AdminProductsComponent implements OnInit 
{
  formCompleted:boolean = true;
  newProductForm: any;
  styleList = ["IPA", "DIPA", "TIPA", "Stout"]

  availableProductsLocal: Array<Product> = []
  
  constructor(private formBuilder: FormBuilder, private _productService: ProductService) 
  {
    this.newProductForm = this.formBuilder.group({'name': '','style': '','abv': '', 'imgUrl': ''}); 
  }

  
  onSubmit(newProduct) 
  {
    let newProductObject = new Product(uuid(), newProduct.value.name, newProduct.value.style, newProduct.value.abv, newProduct.value.imgUrl)
    this._productService.addProduct(newProductObject)
  }


  ngOnInit(): void {
    this._productService.getProducts().subscribe(value => this.availableProductsLocal = value);
  }
}


