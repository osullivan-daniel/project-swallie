import { v4 as uuid } from 'uuid';
import { MatButtonModule } from '@angular/material/button';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';


import { Product } from 'shared-services';
import { ProductService } from '../../../services/product.service'
import { ProducerService, Producer } from '../../../services/producers.service';



@Component({
    selector: 'app-admin-products',
    templateUrl: 'admin-products.component.html',
    styleUrls: ['admin-products.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:[ReactiveFormsModule, MatButtonModule]
})
export class AdminProductsComponent implements OnInit 
{
  localProducers: Producer[] = [];
  formCompleted:boolean = true;
  newProductForm: any;
  styleList = ["IPA", "TIPA", "Stout"]
  // producerList=[{"name":"PLACEHOLDER_1", "id":1}, {"name":"PLACEHOLDER_2", "id":2}, {"name":"PLACEHOLDER_3", "id":3}]

  addNewProducer() 
  {
    console.log("PLACEHOLDER")
  }

  availableProductsLocal: Array<Product> = []
  
  constructor(
    private formBuilder: UntypedFormBuilder, 
    private _productService: ProductService,
    private readonly cdr: ChangeDetectorRef,
    private readonly producerService: ProducerService
  ) 
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

    this.producerService.loadProducers();

    this.producerService.producers$.subscribe((producers) => {
      this.localProducers = producers;
      this.cdr.markForCheck();
    });
  }
}


