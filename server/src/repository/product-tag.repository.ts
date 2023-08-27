import { EntityRepository, Repository } from 'typeorm';
import { ProductTag } from '../domain/product-tag.entity';

@EntityRepository(ProductTag)
export class ProductTagRepository extends Repository<ProductTag> {}
