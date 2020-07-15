export class Product {

    constructor(
      public name: string,
      public style:string,
      public abv: number,
      public imgUrl: string,
      public price: number,
      public discription?: string,
    ) {  }
  
  }