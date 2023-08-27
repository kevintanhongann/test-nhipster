import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTagController } from '../web/rest/product-tag.controller';
import { ProductTagRepository } from '../repository/product-tag.repository';
import { ProductTagService } from '../service/product-tag.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductTagRepository])],
    controllers: [ProductTagController],
    providers: [ProductTagService],
    exports: [ProductTagService],
})
export class ProductTagModule {}
