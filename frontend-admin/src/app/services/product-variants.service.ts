import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export enum ProductSizes {
  CAN_330 = 'Can 330ml',
  CAN_440 = 'Can 440ml',
  BOTTLE_330 = "Bottle 330ml",
  BOTTLE_500 = "Bottle 500ml",
  PINT_THIRD = 'Pint 1/3rd',
  PINT_HALF = 'Pint 1/2',
  PINT = 'Pint',
}

export interface ProductVariant {
    productVarietyId?: uuid;
    producerId: uuid;
    productSize: ProductSizes;
    itemPrice: number;
    imageKey?: string | null;
    isActive?: boolean;
}


@Injectable({ providedIn: 'root' })

export class ProductVariantService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = 'http://127.0.0.1:8000';

  createProductVariant(newProductVariant: ProductVariant): Observable<ProductVariant> {
    return this.http
      .post<ProductVariant>(`${this.apiUrl}/products/createProduct`, newProductVariant)
      .pipe(
        tap((productVariant) => {

          console.log('Created new Product', productVariant);
      }),
    );
  }
}