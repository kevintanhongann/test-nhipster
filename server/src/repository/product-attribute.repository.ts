import { EntityRepository, Repository } from 'typeorm';
import { ProductAttribute } from '../domain/product-attribute.entity';

@EntityRepository(ProductAttribute)
export class ProductAttributeRepository extends Repository<ProductAttribute> {}
