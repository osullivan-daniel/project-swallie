import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  private readonly apiUrl = 'http://127.0.0.1:8000';

  createProduct(newProduct: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiUrl}/products/createProduct`, newProduct)
      .pipe(
        tap((Product) => {

          console.log('Created new Product', Product);
      }),
    );
  }
}