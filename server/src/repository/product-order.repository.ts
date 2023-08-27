import { EntityRepository, Repository } from 'typeorm';
import { ProductOrder } from '../domain/product-order.entity';

@EntityRepository(ProductOrder)
export class ProductOrderRepository extends Repository<ProductOrder> {}
