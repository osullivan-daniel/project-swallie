import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/src/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogApiService {
  private readonly productStream = new BehaviorSubject<Product[]>([]);

  public loadProducts(): Observable<Product[]> {
    return this.productStream.asObservable();
  }

  public publishProducts(products: Product[]): void {
    this.productStream.next(products);
  }
}
