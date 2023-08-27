/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Product } from './product.entity';

/**
 * A ProductVariation.
 */
@Entity('product_variation')
export class ProductVariation extends BaseEntity {
    @Column({ type: 'decimal', name: 'regular_price', precision: 10, scale: 2 })
    regularPrice: number;

    @Column({ type: 'decimal', name: 'sale_price', precision: 10, scale: 2 })
    salePrice: number;

    @Column({ type: 'date', name: 'date_on_sale_from' })
    dateOnSaleFrom: any;

    @Column({ type: 'date', name: 'date_on_sale_to' })
    dateOnSaleTo: any;

    @Column({ type: 'boolean', name: 'virtual' })
    virtual: boolean;

    @Column({ type: 'boolean', name: 'downloadable' })
    downloadable: boolean;

    @ManyToOne((type) => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
