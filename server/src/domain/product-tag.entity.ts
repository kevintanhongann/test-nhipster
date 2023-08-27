/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Product } from './product.entity';

/**
 * A ProductTag.
 */
@Entity('product_tag')
export class ProductTag extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'slug' })
    slug: string;

    @Column({ name: 'description' })
    description: string;

    @ManyToOne((type) => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
