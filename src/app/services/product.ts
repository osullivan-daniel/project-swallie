export class Product {

    constructor(
      public name: string,
      public style:string,
      public abv: number,
      public imgUrl: string,
      public discription?: string,
      public size = {"Cans": false,
                     "1/2's": false,
                     "1/3's": false}
    ) {  }

  }