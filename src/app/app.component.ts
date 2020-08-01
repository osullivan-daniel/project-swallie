import { Component } from '@angular/core';
import { ProductService } from './services/product.service'
import { MenuService } from './services/menu.service'

@Component({
  selector: 'app-root',
  template:
`
<router-outlet></router-outlet>
`,
  styleUrls: []
})

export class AppComponent
{
  title = 'project-swallie';

  constructor(private __productService: ProductService, private __menuService: MenuService,){
    //console.log('product service')
    __productService.load()
    __menuService.load(__productService.getProducts())
  }
}