import { EntityRepository, Repository } from 'typeorm';
import { ProductReview } from '../domain/product-review.entity';

@EntityRepository(ProductReview)
export class ProductReviewRepository extends Repository<ProductReview> {}
