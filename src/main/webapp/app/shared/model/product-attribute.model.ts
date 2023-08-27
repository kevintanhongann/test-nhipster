import { IProductAttributeTerm } from '@/shared/model/product-attribute-term.model';
import { IProduct } from '@/shared/model/product.model';

export interface IProductAttribute {
  id?: number;
  name?: string;
  slug?: string;
  type?: string;
  productAttributeTerms?: IProductAttributeTerm[] | null;
  product?: IProduct | null;
}

export class ProductAttribute implements IProductAttribute {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public type?: string,
    public productAttributeTerms?: IProductAttributeTerm[] | null,
    public product?: IProduct | null
  ) {}
}
