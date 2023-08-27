import { EntityRepository, Repository } from 'typeorm';
import { ProductCategory } from '../domain/product-category.entity';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {}
