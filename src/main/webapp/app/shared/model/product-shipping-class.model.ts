import { IProduct } from '@/shared/model/product.model';

export interface IProductShippingClass {
  id?: number;
  name?: string;
  slug?: string;
  description?: string | null;
  count?: number | null;
  product?: IProduct | null;
}

export class ProductShippingClass implements IProductShippingClass {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string | null,
    public count?: number | null,
    public product?: IProduct | null
  ) {}
}
