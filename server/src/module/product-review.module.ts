import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewController } from '../web/rest/product-review.controller';
import { ProductReviewRepository } from '../repository/product-review.repository';
import { ProductReviewService } from '../service/product-review.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductReviewRepository])],
    controllers: [ProductReviewController],
    providers: [ProductReviewService],
    exports: [ProductReviewService],
})
export class ProductReviewModule {}
