import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from './services/product.service'
import { MenuService } from 'shared-services';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend-admin';

  // constructor(productService: ProductService, menuService: MenuService,){
  //   // productService.loadAllProducts()
  //   // menuService.load(productService.getProducts())
  // }
}

