export class CreateOrderDto  {
    readonly customerID: number;
    readonly orderDate: Date;
    readonly price: number;
    readonly status: string;
}
  