import { IProduct } from '@/shared/model/product.model';

export interface IProductCategory {
  id?: number;
  name?: string;
  slug?: string;
  description?: string | null;
  product?: IProduct | null;
}

export class ProductCategory implements IProductCategory {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string | null,
    public product?: IProduct | null
  ) {}
}
