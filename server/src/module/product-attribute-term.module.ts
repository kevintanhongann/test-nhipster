import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeTermController } from '../web/rest/product-attribute-term.controller';
import { ProductAttributeTermRepository } from '../repository/product-attribute-term.repository';
import { ProductAttributeTermService } from '../service/product-attribute-term.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductAttributeTermRepository])],
    controllers: [ProductAttributeTermController],
    providers: [ProductAttributeTermService],
    exports: [ProductAttributeTermService],
})
export class ProductAttributeTermModule {}
