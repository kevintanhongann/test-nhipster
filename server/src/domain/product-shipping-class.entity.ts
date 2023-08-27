/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Product } from './product.entity';

/**
 * A ProductShippingClass.
 */
@Entity('product_shipping_class')
export class ProductShippingClass extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'slug' })
    slug: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ type: 'integer', name: 'count', nullable: true })
    count: number;

    @OneToOne((type) => Product)
    @JoinColumn()
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
