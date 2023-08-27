import { EntityRepository, Repository } from 'typeorm';
import { ProductAttributeTerm } from '../domain/product-attribute-term.entity';

@EntityRepository(ProductAttributeTerm)
export class ProductAttributeTermRepository extends Repository<ProductAttributeTerm> {}
