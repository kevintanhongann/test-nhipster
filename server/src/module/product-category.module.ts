import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryController } from '../web/rest/product-category.controller';
import { ProductCategoryRepository } from '../repository/product-category.repository';
import { ProductCategoryService } from '../service/product-category.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategoryRepository])],
    controllers: [ProductCategoryController],
    providers: [ProductCategoryService],
    exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
