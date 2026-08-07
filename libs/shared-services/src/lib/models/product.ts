export class Product {

    constructor(
      public productId: string = '',
      public name: string = '',
      public style:string = '',
      public abv: number = 0,
      public imgUrl: string = '',
      public cans: boolean = false,
      public halves: boolean = false,
      public thirds: boolean = false,
      public cansPrice: number = 0,
      public halvesPrice: number = 0,
      public thirdsPrice: number = 0
    ) { }

    public getPrice(size: string)
    {
      if (size == 'cans') {return this.cansPrice}
      if (size == 'halves') {return this.halvesPrice}
      if (size == 'thirds') {return this.thirdsPrice}    
    }

    public getSizeEnabled(size: string)
    {
      if (size == 'cans') {return this.cans}
      if (size == 'halves') {return this.halves}
      if (size == 'thirds') {return this.thirds}    
    }
  }