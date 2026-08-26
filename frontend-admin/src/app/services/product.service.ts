import { v4 as uuid } from 'uuid';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProductVariant } from './product-variants.service';


export interface Product {
    productId?: uuid;
    producerId: uuid;
    productName: string;
    style: string;
    abv?: number | null;
    description?: string | null;
    imageKey?: string | null;
    isActive?: boolean;
    variants?: ProductVariant[] 
}


@Injectable({ providedIn: 'root' })

export class ProductService {
  constructor(private readonly http: HttpClient) {}

    private productsSubject = new BehaviorSubject<Product[]>([]);
  
    products$ = this.productsSubject.asObservable();
  
    private productsLoaded = false;
  
    loadProducts(forceReload = false): void {
      if (this.productsLoaded && !forceReload) {
        return;
      }
  
      console.log('Loading Products');
      this.http.get<Product[]>(`/products/products`).subscribe({
        next: (products) => {
          console.log(products);
  
          this.productsSubject.next(products);
          this.productsLoaded = true;
        },
        error: (error) => {
          console.error('Failed to load products:', error);
        },
      });
    }

  createProduct(newProduct: Product): Observable<Product> {
    return this.http
      .post<Product>(`/products/createProduct`, newProduct)
      .pipe(
        tap((product) => {

          const currentProducts = this.productsSubject.value;
          console.log('Created new Product', product);

          this.productsSubject.next([
            ...currentProducts,
            product,
          ]);
      }),
    );
  }
}