import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { uniqueNameValidator } from 'shared-functions';
import { Product } from '../../../services/product.service';
import { ProductService } from '../../../services/product.service'
import { ProducerService, Producer } from '../../../services/producers.service';
import { AddProducerComponent } from '../admin-add-producer-dialog/add-producer.component'


@Component({
    selector: 'app-admin-products',
    templateUrl: 'admin-products.component.html',
    styleUrls: ['admin-products.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:[ReactiveFormsModule, MatFormFieldModule, MatButtonModule]
})

export class AdminProductsComponent implements OnInit 
{
  private readonly dialog = inject(MatDialog);  
  localProductNamesSet: Set<string> = new Set();
  localProducers: Producer[] = [];
  newProductForm: FormGroup;

  constructor(
    private productService: ProductService,
    private readonly cdr: ChangeDetectorRef,
    private readonly producerService: ProducerService
  ) 
  {
    console.log('AdminProductsComponent constructed');

    this.newProductForm = this.fb.group({
      producerId: ['', [Validators.required]],
      productName: ['', [uniqueNameValidator(() => this.localProductNamesSet), Validators.required]],
      style: ['', [Validators.maxLength(20), Validators.required]],
      abv: ['', [Validators.maxLength(20), Validators.required]],
      imgUrl: ['', [Validators.maxLength(500)]]
    });

    this.newProductForm.get('producerId')!.valueChanges.subscribe(id => {
      const newProducerId = this.localProducers.find(
        item => item.producerId === id
      );

      this.localProductNamesSet = new Set(
        newProducerId?.products
          .map(item => item.productName.trim().toLowerCase())
          .filter(Boolean) ?? []
      );

      console.log(this.localProductNamesSet)
    });
  }

  private readonly fb = inject(FormBuilder);



  ngOnInit(): void {
    this.producerService.loadProducers();

    this.producerService.producers$.subscribe((producers) => {
      this.localProducers = producers;
      this.cdr.markForCheck();
    });
  }


  addProducer(): void {
    this.dialog.open(AddProducerComponent);
  }


  onSubmit(newProductForm): void {
  
    if (this.newProductForm.invalid) {
      this.newProductForm.markAllAsTouched();
      return;
    }

    const product: Product = newProductForm.getRawValue() as Product;

    console.log("admin-products.component.ts")
    console.log(product)

    this.productService.createProduct(product).subscribe({
      next: (createdProduct) => {
        console.log("Did it work")
        console.log(createdProduct)
      }
    });

    this.producerService.loadProducers(true);

    this.producerService.producers$.subscribe((producers) => {
      this.localProducers = producers;
      this.cdr.markForCheck();
    });

    this.newProductForm.reset();
  }
}
