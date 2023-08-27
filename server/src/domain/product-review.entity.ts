/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Product } from './product.entity';
import { ReviewStatus } from './enumeration/review-status';

/**
 * A ProductReview.
 */
@Entity('product_review')
export class ProductReview extends BaseEntity {
    @Column({ name: 'reviewer_name' })
    reviewerName: string;

    @Column({ name: 'reviewer_email' })
    reviewerEmail: string;

    @Column({ name: 'review' })
    review: string;

    @Column({ type: 'integer', name: 'rating' })
    rating: number;

    @Column({ type: 'simple-enum', name: 'status', enum: ReviewStatus })
    status: ReviewStatus;

    @ManyToOne((type) => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
