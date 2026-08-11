import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from 'shared-services';
import { v4 as uuid } from 'uuid';

export enum productSize {
  CAN_330 = 'Can 330ml',
  CAN_440 = 'Can 440ml',
  BOTTLE_330 = "Bottle 330ml",
  BOTTLE_500 = "Bottle 500ml",
  PINT_THIRD = 'Pint 1/3rd',
  PINT_HALF = 'Pint 1/2',
  PINT = 'Pint',
}



@Injectable({
    providedIn: 'root'
  })

  export class ProductService {
    constructor(private readonly http: HttpClient) {}

    private productList = new BehaviorSubject(null);
    productList$ = this.productList.asObservable();


    getProducts()
    {
        return this.productList.asObservable();
    }
    


    //This will later be updated with api call
    updateAvailableProductsFromServer()
    {
      let prodList = []
      
      prodList.push(new Product(uuid(), "BLACK IS THE COLOUR", "IPA", 7.7,
                               "../../assets/img/cans/ipas/black+is+the+colour+can+shot+small.jpg",
                               true,false,false,2.50))
  
      prodList.push(new Product(uuid(), "RIGHT HAND MAN BACK", "IPA", 7.2,
                               "../../assets/img/cans/ipas/right+hand+man+back+can+shot+small.jpg",
                               false,true,false,null,3))
                               
      prodList.push(new Product(uuid(), "SCREWBALL", "IPA", 5.1,
                                "../../assets/img/cans/ipas/screwball-can-shot.jpg",
                                false,true,false,null,2.75))
  
      prodList.push(new Product(uuid(), "FOREVER AGO", "IPA", 6,
                                "../../assets/img/cans/ipas/forever+ago+can+shot+small.jpg",
                                false,true,false,null,3.25))
  
      prodList.push(new Product(uuid(), "HR", "TIPA", 10,
                                "../../assets/img/cans/tipas/HR-can-shot-small_180x.webp",
                                false,false,true,null,null,4))
  
      prodList.push(new Product(uuid(), "15", "Stout", 9.7,
                                "../../assets/img/cans/stouts/15+can+shot+small.jpg",
                                true,false,false,3.75))
                                
      prodList.push(new Product(uuid(), "SOTERIOLOGY", "Stout", 11.7,
                                "../../assets/img/cans/stouts/soteriology+can+shot+small.jpg",
                                true,false,true,3.55,null,3))
  
      prodList.push(new Product(uuid(), "YOU'RE NOT GETTING ANY", "Stout", 12,
                                "../../assets/img/cans/stouts/youre+not+getting+any+can+shot+small.jpg",
                                true,true,false,3.5,4.25))
      
      return prodList
    }
  
    addProduct(newProduct: Product): void
    {
      //TODO:: fresh GET?
      //TODO:: POST update? 

      let prodList = [] 
    
      this.productList.value.forEach( item => {
        const clone = Object.assign( {}, item );
        prodList.push(Object.setPrototypeOf( clone, Product.prototype ));
      });
  
      prodList.push(newProduct)
      this.productList.next(prodList);
    }

    getProductById(id: string): Product
    {
      let returnItem = null
      this.productList.value.forEach( item => {
        if (id == item.productId)
        {
          returnItem = item
        }
      });
      return returnItem
    }

    loadAllProducts()
    {
      console.log('Loading Product Service At Startup Time')
      this.productList.next(this.updateAvailableProductsFromServer());
    }
  }