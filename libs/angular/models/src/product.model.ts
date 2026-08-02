export class Product {
  constructor(
    public productId: string = '',
    public name: string = '',
    public style: string = '',
    public abv: number = null,
    public imgUrl: string = '',
    public cans: boolean = false,
    public halves: boolean = false,
    public thirds: boolean = false,
    public cansPrice: number = null,
    public halvesPrice: number = null,
    public thirdsPrice: number = null
  ) {}

  public getPrice(size: string) {
    if (size === 'cans') { return this.cansPrice; }
    if (size === 'halves') { return this.halvesPrice; }
    if (size === 'thirds') { return this.thirdsPrice; }
  }

  public getSizeEnabled(size: string) {
    if (size === 'cans') { return this.cans; }
    if (size === 'halves') { return this.halves; }
    if (size === 'thirds') { return this.thirds; }
  }
}
