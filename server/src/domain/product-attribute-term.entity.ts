/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ProductAttribute } from './product-attribute.entity';

/**
 * A ProductAttributeTerm.
 */
@Entity('product_attribute_term')
export class ProductAttributeTerm extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'slug' })
    slug: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ type: 'integer', name: 'menu_order' })
    menuOrder: number;

    @ManyToOne((type) => ProductAttribute)
    productAttribute: ProductAttribute;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
