import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef } from '@angular/core';

import { Product } from '../../../services/product.service'
import { ProductSizes, ProductVariant, ProductVariantService } from '../../../services/product-variants.service';
import { Producer, ProducerService } from '../../../services/producers.service';

type ProductSize = {
  key: string;
  value: string;
  active: boolean;
};

@Component({
    selector: 'app-admin-product-varieties',
    templateUrl: 'admin-product-varieties.html',
    styleUrl: 'admin-product-varieties.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports:[ReactiveFormsModule, MatFormFieldModule, MatButtonModule]
})

export class AdminProductVarieties implements OnInit 
{
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  allProductSizes: ProductSize[]  = Object.entries(ProductSizes).map(([key, value]) => ({ key,value,active: true }));
  localproductSizes: ProductSize[]  = [];
  localProducts: Product[] = [];
  localProducers: Producer[] = [];
  newProductVarietyForm: FormGroup;
  localProductNamesSet: Set<string> = new Set();
  localProducerNamesSet: Set<string> = new Set();

  constructor(
    private productVariantService: ProductVariantService,
    private readonly cdr: ChangeDetectorRef,
    private readonly producerService: ProducerService
  ) 
  {
    console.log('AdminProductVarieties constructed');

    this.newProductVarietyForm = this.fb.group({
      producerId: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      productSize: ['', [Validators.required]],
      price: ['', [Validators.required]],
      imgUrl: ['']
    });

    const priceControl = this.newProductVarietyForm.get('price')!;
    const imgUrlControl = this.newProductVarietyForm.get('imgUrl')!;
    const productControl = this.newProductVarietyForm.get('productId')!;
    const productSizeControl = this.newProductVarietyForm.get('productSize')!;
    
    priceControl.disable();
    imgUrlControl.disable();
    productControl.disable();
    productSizeControl.disable();

    this.newProductVarietyForm.get('producerId')!.valueChanges.subscribe(id => {

      const newProducerId = this.localProducers.find(
        item => item.producerId === id
      );
      this.localProducts = newProducerId?.products

      console.log("test::", this.localProducts)

      for(const each of [priceControl, imgUrlControl, productSizeControl])
      {
        this.disableControl(each)
      }

      if (newProducerId) {
        this.enableControl(productControl);
      }
    });

    this.newProductVarietyForm.get('productId')!.valueChanges.subscribe(id => {

      const newproductId = this.localProducts?.find(
        item => item.productId === id
      );
      

      const alreadyAddedVariants = newproductId?.variants.map(item => item.productSize.trim().toLowerCase())  ?? [];

      this.localproductSizes = this.allProductSizes?.map(item => ({
        ...item,
        active: !alreadyAddedVariants?.includes(item.value.trim().toLowerCase())
      }));

      console.log("test456::", this.localproductSizes)


      for(const each of [priceControl, imgUrlControl])
      {
        this.disableControl(each)
      }

      if (newproductId) {
        this.enableControl(productSizeControl);
      }
    });

    this.newProductVarietyForm.get('productSize')!.valueChanges.subscribe(enumKey => {
      console.log("test::", enumKey)

      if (enumKey) {
        for(const each of [priceControl, imgUrlControl])
        {
          this.enableControl(each)
        }
      }

    });
  }

  ngOnInit(): void {
    console.log('AdminProductVarieties ngOnInit');

    this.callLoadProducers()
  }

  onSubmit(newProductVarietyForm): void {
    console.log('AdminProductVarieties onSubmit click');

    if (this.newProductVarietyForm.invalid) {
      this.newProductVarietyForm.markAllAsTouched();
      return;
    }

    const productVariant: ProductVariant = newProductVarietyForm.getRawValue() as ProductVariant;

    
    this.productVariantService.createProductVariant(productVariant).subscribe({
      next: (createdProduct) => {
        console.log("Did it work")
        console.log(createdProduct)
      }
    });

    this.callLoadProducers(true)
    this.resetForm()
  }

  enableControl(control: AbstractControl<any, any, any>): void{
    control.reset('', { emitEvent: false });
    control.enable();
  }

  disableControl(control: AbstractControl<any, any, any>): void{
    control.reset('', { emitEvent: false });
    control.disable();
  }

  callLoadProducers(override: boolean=false): void {
    this.producerService.producers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((producers) => {
        this.localProducers = producers;
        this.cdr.markForCheck();
      });

    this.producerService.loadProducers(override);
  }

  resetForm(): void {
    this.newProductVarietyForm.reset({}, { emitEvent: false });

    this.disableControl(this.newProductVarietyForm.get('productId')!);
    this.disableControl(this.newProductVarietyForm.get('productSize')!);
    this.disableControl(this.newProductVarietyForm.get('price')!);
    this.disableControl(this.newProductVarietyForm.get('imgUrl')!);

    this.enableControl(this.newProductVarietyForm.get('producerId'))
  }
}

