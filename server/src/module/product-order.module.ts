import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrderController } from '../web/rest/product-order.controller';
import { ProductOrderRepository } from '../repository/product-order.repository';
import { ProductOrderService } from '../service/product-order.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductOrderRepository])],
    controllers: [ProductOrderController],
    providers: [ProductOrderService],
    exports: [ProductOrderService],
})
export class ProductOrderModule {}
