import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';


import { Product } from 'shared-services';
import { ProductService } from '../../../services/product.service'
import { ProducerService, Producer } from '../../../services/producers.service';
import { AddProducerComponent } from '../admin-add-producer-dialog/add-producer.component'


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
  private readonly dialog = inject(MatDialog);  
  newProductForm: any;
  localProducers: Producer[] = [];
  formCompleted:boolean = true;
  
  styleList = ["IPA", "TIPA", "Stout"]

  availableProductsLocal: Array<Product> = []
  
  constructor(
    private formBuilder: UntypedFormBuilder, 
    private _productService: ProductService,
    private readonly cdr: ChangeDetectorRef,
    private readonly producerService: ProducerService
  ) 
  {
    console.log('AdminProductsComponent constructed');
    this.newProductForm = this.formBuilder.group({
      localProducers:[], 
      'name': '',
      'style': '',
      'abv': '',
      'imgUrl': ''}); 
  }

  ngOnInit(): void {

    this._productService.getProducts().subscribe(value => this.availableProductsLocal = value);

    this.producerService.loadProducers();

    this.producerService.producers$.subscribe((producers) => {
      this.localProducers = producers;
      this.cdr.markForCheck();
    });
  }


  addProducer(): void {
  const dialogRef = this.dialog.open(AddProducerComponent, {
    width: '600px'
  });

  dialogRef.afterClosed().subscribe(producer => {
    if (!producer) {
      return;
    }

    // Add returned producer to your dropdown
    // and select it here.
  });
}


  onSubmit(newProduct) 
  {
    let newProductObject = new Product(uuid(), newProduct.value.name, newProduct.value.style, newProduct.value.abv, newProduct.value.imgUrl)
    this._productService.addProduct(newProductObject)
    this.newProductForm.reset();
  }

  addNewProducer() 
  {
    console.log("PLACEHOLDER")
  }

}


