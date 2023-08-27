/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ProductOrder } from './product-order.entity';

/**
 * A Item.
 */
@Entity('item')
export class Item extends BaseEntity {
    @Column({ type: 'integer', name: 'quantity' })
    quantity: number;

    @Column({ type: 'decimal', name: 'total_price', precision: 10, scale: 2 })
    totalPrice: number;

    @ManyToOne((type) => ProductOrder)
    productOrder: ProductOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
