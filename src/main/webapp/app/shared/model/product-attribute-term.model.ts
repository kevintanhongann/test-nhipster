import { IProductAttribute } from '@/shared/model/product-attribute.model';

export interface IProductAttributeTerm {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  menuOrder?: number;
  productAttribute?: IProductAttribute;
}

export class ProductAttributeTerm implements IProductAttributeTerm {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public menuOrder?: number,
    public productAttribute?: IProductAttribute
  ) {}
}
