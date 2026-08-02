export class Order {
  constructor(
    public tableNumber: string = '',
    public customerName: string = '',
    public orderTime: string = '',
    public order: Array<any>
  ) {}
}
