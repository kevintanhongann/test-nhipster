import { IProduct } from '@/shared/model/product.model';

export interface IProductImage {
  id?: number;
  filename?: string;
  url?: string;
  mimeType?: string;
  product?: IProduct | null;
}

export class ProductImage implements IProductImage {
  constructor(
    public id?: number,
    public filename?: string,
    public url?: string,
    public mimeType?: string,
    public product?: IProduct | null
  ) {}
}
