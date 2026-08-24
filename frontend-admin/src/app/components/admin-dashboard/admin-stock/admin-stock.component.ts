import { JsonPipe } from '@angular/common'
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';

import { ProductService, Product } from '../../../services/product.service'


@Component({
    selector: 'app-admin-stock',
    templateUrl: 'admin-stock.component.html',
    styleUrls: ['admin-stock.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ MatListModule, MatCardModule, JsonPipe]
})

export class AdminStockComponent {
  private readonly destroyRef = inject(DestroyRef);

  localProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private readonly cdr: ChangeDetectorRef,
  ) 
  {

  }

  ngOnInit(): void {
    console.log('AdminAvailableStock ngOnInit');

    this.callLoadProducts()
  }

  callLoadProducts(override: boolean=false): void {
    this.productService.products$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.localProducts = products;
        this.cdr.markForCheck();
      });

    this.productService.loadProducts(override);
  }
}
