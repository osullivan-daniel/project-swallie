import { Product } from './product'

export class Order {

    constructor(
      public tableNumber: string = '',
      public customerName: string = '',
      public orderTime: string = '',
      public order:Array<any>
    ) { }

    // public getPrice(size)
    // {
    //   if (size == 'cans') {return this.cansPrice}
    //   if (size == 'halves') {return this.halvesPrice}
    //   if (size == 'thirds') {return this.thirdsPrice}    
    // }

    // public getSizeEnabled(size)
    // {
    //   if (size == 'cans') {return this.cans}
    //   if (size == 'halves') {return this.halves}
    //   if (size == 'thirds') {return this.thirds}    
    // }
  }