/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ProductAttributeTerm } from './product-attribute-term.entity';
import { Product } from './product.entity';

/**
 * A ProductAttribute.
 */
@Entity('product_attribute')
export class ProductAttribute extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'slug' })
    slug: string;

    @Column({ name: 'type' })
    type: string;

    @OneToMany((type) => ProductAttributeTerm, (other) => other.productAttribute)
    productAttributeTerms: ProductAttributeTerm[];

    @ManyToOne((type) => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
