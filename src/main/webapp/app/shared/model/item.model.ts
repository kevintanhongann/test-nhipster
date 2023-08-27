import { IProductOrder } from '@/shared/model/product-order.model';

export interface IItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  productOrder?: IProductOrder | null;
}

export class Item implements IItem {
  constructor(public id?: number, public quantity?: number, public totalPrice?: number, public productOrder?: IProductOrder | null) {}
}
