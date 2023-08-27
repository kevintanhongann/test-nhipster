import { DiscountType } from '@/shared/model/enumerations/discount-type.model';
export interface ICoupon {
  id?: number;
  code?: string;
  amount?: number;
  discountType?: DiscountType;
  description?: string;
  expiry?: Date;
  individualUse?: boolean;
  usageLimit?: number;
  usageLimitPerUser?: number;
  freeShipping?: boolean;
  minimumAmount?: string;
  maximumAmount?: string;
}

export class Coupon implements ICoupon {
  constructor(
    public id?: number,
    public code?: string,
    public amount?: number,
    public discountType?: DiscountType,
    public description?: string,
    public expiry?: Date,
    public individualUse?: boolean,
    public usageLimit?: number,
    public usageLimitPerUser?: number,
    public freeShipping?: boolean,
    public minimumAmount?: string,
    public maximumAmount?: string
  ) {
    this.individualUse = this.individualUse ?? false;
    this.freeShipping = this.freeShipping ?? false;
  }
}
