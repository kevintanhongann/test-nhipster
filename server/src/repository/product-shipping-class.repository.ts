import { EntityRepository, Repository } from 'typeorm';
import { ProductShippingClass } from '../domain/product-shipping-class.entity';

@EntityRepository(ProductShippingClass)
export class ProductShippingClassRepository extends Repository<ProductShippingClass> {}
