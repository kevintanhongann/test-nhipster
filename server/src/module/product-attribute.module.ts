import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeController } from '../web/rest/product-attribute.controller';
import { ProductAttributeRepository } from '../repository/product-attribute.repository';
import { ProductAttributeService } from '../service/product-attribute.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductAttributeRepository])],
    controllers: [ProductAttributeController],
    providers: [ProductAttributeService],
    exports: [ProductAttributeService],
})
export class ProductAttributeModule {}
