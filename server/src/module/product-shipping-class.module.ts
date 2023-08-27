import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductShippingClassController } from '../web/rest/product-shipping-class.controller';
import { ProductShippingClassRepository } from '../repository/product-shipping-class.repository';
import { ProductShippingClassService } from '../service/product-shipping-class.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductShippingClassRepository])],
    controllers: [ProductShippingClassController],
    providers: [ProductShippingClassService],
    exports: [ProductShippingClassService],
})
export class ProductShippingClassModule {}
