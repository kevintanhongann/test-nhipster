import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponController } from '../web/rest/coupon.controller';
import { CouponRepository } from '../repository/coupon.repository';
import { CouponService } from '../service/coupon.service';

@Module({
    imports: [TypeOrmModule.forFeature([CouponRepository])],
    controllers: [CouponController],
    providers: [CouponService],
    exports: [CouponService],
})
export class CouponModule {}
