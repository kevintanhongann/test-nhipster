import { EntityRepository, Repository } from 'typeorm';
import { Coupon } from '../domain/coupon.entity';

@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> {}
