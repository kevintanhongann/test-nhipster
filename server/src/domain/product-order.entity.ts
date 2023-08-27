/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Transaction } from './transaction.entity';
import { Item } from './item.entity';
import { OrderStatus } from './enumeration/order-status';
import { DeliveryOption } from './enumeration/delivery-option';

import { User } from './user.entity';

/**
 * A ProductOrder.
 */
@Entity('product_order')
export class ProductOrder extends BaseEntity {
    @Column({ type: 'datetime', name: 'placed_date' })
    placedDate: any;

    @Column({ type: 'simple-enum', name: 'status', enum: OrderStatus })
    status: OrderStatus;

    @Column({ name: 'code' })
    code: string;

    @Column({ type: 'long', name: 'invoice_id', nullable: true })
    invoiceId: number;

    @Column({ type: 'simple-enum', name: 'delivery_option', enum: DeliveryOption })
    deliveryOption: DeliveryOption;

    @OneToOne((type) => Transaction)
    @JoinColumn()
    transaction: Transaction;

    @OneToMany((type) => Item, (other) => other.productOrder)
    items: Item[];

    @ManyToOne((type) => User)
    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
