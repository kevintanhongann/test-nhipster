import { IProduct } from '@/shared/model/product.model';

export interface IProductTag {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  product?: IProduct | null;
}

export class ProductTag implements IProductTag {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public product?: IProduct | null
  ) {}
}
