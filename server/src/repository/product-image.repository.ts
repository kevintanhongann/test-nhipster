import { EntityRepository, Repository } from 'typeorm';
import { ProductImage } from '../domain/product-image.entity';

@EntityRepository(ProductImage)
export class ProductImageRepository extends Repository<ProductImage> {}
