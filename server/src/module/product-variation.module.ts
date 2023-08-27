import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariationController } from '../web/rest/product-variation.controller';
import { ProductVariationRepository } from '../repository/product-variation.repository';
import { ProductVariationService } from '../service/product-variation.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductVariationRepository])],
    controllers: [ProductVariationController],
    providers: [ProductVariationService],
    exports: [ProductVariationService],
})
export class ProductVariationModule {}
