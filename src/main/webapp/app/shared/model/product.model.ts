import { IProductImage } from '@/shared/model/product-image.model';
import { IProductAttribute } from '@/shared/model/product-attribute.model';
import { IProductVariation } from '@/shared/model/product-variation.model';
import { IProductTag } from '@/shared/model/product-tag.model';
import { IProductCategory } from '@/shared/model/product-category.model';
import { IProductReview } from '@/shared/model/product-review.model';
import { IProductShippingClass } from '@/shared/model/product-shipping-class.model';
import { ITaxClass } from '@/shared/model/tax-class.model';

import { TaxStatus } from '@/shared/model/enumerations/tax-status.model';
import { StockStatus } from '@/shared/model/enumerations/stock-status.model';
import { BackOrders } from '@/shared/model/enumerations/back-orders.model';
import { CatalogVisibility } from '@/shared/model/enumerations/catalog-visibility.model';
export interface IProduct {
  id?: number;
  name?: string;
  slug?: string;
  skuNumber?: string | null;
  description?: string;
  shortDescription?: string;
  regularPrice?: number;
  salePrice?: number;
  published?: boolean;
  dateCreated?: Date;
  dateModified?: Date;
  featured?: boolean;
  taxStatus?: TaxStatus;
  manageStock?: boolean;
  stockStatus?: StockStatus;
  soldIndividually?: boolean;
  backOrders?: BackOrders;
  weight?: number;
  virtual?: boolean;
  downloadable?: boolean;
  downloadLimit?: number | null;
  downloadExpiry?: number | null;
  shippingRequired?: boolean;
  shippingTaxable?: boolean;
  parentId?: number | null;
  purchaseNote?: string;
  catalogVisibility?: CatalogVisibility;
  productImages?: IProductImage[] | null;
  productAttributes?: IProductAttribute[] | null;
  productVariations?: IProductVariation[] | null;
  productTags?: IProductTag[] | null;
  productCategories?: IProductCategory[] | null;
  productReviews?: IProductReview[] | null;
  productShippingClass?: IProductShippingClass;
  taxClass?: ITaxClass;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public skuNumber?: string | null,
    public description?: string,
    public shortDescription?: string,
    public regularPrice?: number,
    public salePrice?: number,
    public published?: boolean,
    public dateCreated?: Date,
    public dateModified?: Date,
    public featured?: boolean,
    public taxStatus?: TaxStatus,
    public manageStock?: boolean,
    public stockStatus?: StockStatus,
    public soldIndividually?: boolean,
    public backOrders?: BackOrders,
    public weight?: number,
    public virtual?: boolean,
    public downloadable?: boolean,
    public downloadLimit?: number | null,
    public downloadExpiry?: number | null,
    public shippingRequired?: boolean,
    public shippingTaxable?: boolean,
    public parentId?: number | null,
    public purchaseNote?: string,
    public catalogVisibility?: CatalogVisibility,
    public productImages?: IProductImage[] | null,
    public productAttributes?: IProductAttribute[] | null,
    public productVariations?: IProductVariation[] | null,
    public productTags?: IProductTag[] | null,
    public productCategories?: IProductCategory[] | null,
    public productReviews?: IProductReview[] | null,
    public productShippingClass?: IProductShippingClass,
    public taxClass?: ITaxClass
  ) {
    this.published = this.published ?? false;
    this.featured = this.featured ?? false;
    this.manageStock = this.manageStock ?? false;
    this.soldIndividually = this.soldIndividually ?? false;
    this.virtual = this.virtual ?? false;
    this.downloadable = this.downloadable ?? false;
    this.shippingRequired = this.shippingRequired ?? false;
    this.shippingTaxable = this.shippingTaxable ?? false;
  }
}
