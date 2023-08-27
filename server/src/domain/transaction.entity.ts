/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ProductOrder } from './product-order.entity';
import { Refund } from './refund.entity';
import { TransactionStatus } from './enumeration/transaction-status';

/**
 * A Transaction.
 */
@Entity('transaction')
export class Transaction extends BaseEntity {
    @Column({ name: 'code' })
    code: string;

    @Column({ type: 'decimal', name: 'amount', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'simple-enum', name: 'status', enum: TransactionStatus })
    status: TransactionStatus;

    @OneToOne((type) => ProductOrder)
    productOrder: ProductOrder;

    @OneToOne((type) => Refund)
    refund: Refund;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
