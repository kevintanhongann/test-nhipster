import { EntityRepository, Repository } from 'typeorm';
import { ProductVariation } from '../domain/product-variation.entity';

@EntityRepository(ProductVariation)
export class ProductVariationRepository extends Repository<ProductVariation> {}
