import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageController } from '../web/rest/product-image.controller';
import { ProductImageRepository } from '../repository/product-image.repository';
import { ProductImageService } from '../service/product-image.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductImageRepository])],
    controllers: [ProductImageController],
    providers: [ProductImageService],
    exports: [ProductImageService],
})
export class ProductImageModule {}
