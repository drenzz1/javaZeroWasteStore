import {Customer} from "./customer";
import {Address} from "./address";
import {Order} from "./order";
import {OrderItem} from "./order-item";

export class Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];

  constructor() {
    this.customer = new Customer();
    this.shippingAddress = new Address();
    this.billingAddress = new Address();
    this.order = new Order();
    this.orderItems = [];
  }
}
