import { IProduct } from '@/shared/model/product.model';

export interface IProductVariation {
  id?: number;
  regularPrice?: number;
  salePrice?: number;
  dateOnSaleFrom?: Date;
  dateOnSaleTo?: Date;
  virtual?: boolean;
  downloadable?: boolean;
  product?: IProduct;
}

export class ProductVariation implements IProductVariation {
  constructor(
    public id?: number,
    public regularPrice?: number,
    public salePrice?: number,
    public dateOnSaleFrom?: Date,
    public dateOnSaleTo?: Date,
    public virtual?: boolean,
    public downloadable?: boolean,
    public product?: IProduct
  ) {
    this.virtual = this.virtual ?? false;
    this.downloadable = this.downloadable ?? false;
  }
}
