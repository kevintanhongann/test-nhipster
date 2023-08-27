import { IProduct } from '@/shared/model/product.model';

import { ReviewStatus } from '@/shared/model/enumerations/review-status.model';
export interface IProductReview {
  id?: number;
  reviewerName?: string;
  reviewerEmail?: string;
  review?: string;
  rating?: number;
  status?: ReviewStatus;
  product?: IProduct;
}

export class ProductReview implements IProductReview {
  constructor(
    public id?: number,
    public reviewerName?: string,
    public reviewerEmail?: string,
    public review?: string,
    public rating?: number,
    public status?: ReviewStatus,
    public product?: IProduct
  ) {}
}
