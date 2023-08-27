/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Transaction } from './transaction.entity';
import { RefundStatus } from './enumeration/refund-status';

import { User } from './user.entity';

/**
 * A Refund.
 */
@Entity('refund')
export class Refund extends BaseEntity {
    @Column({ type: 'decimal', name: 'amount', precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'reason' })
    reason: string;

    @Column({ name: 'order_code' })
    orderCode: string;

    @Column({ type: 'simple-enum', name: 'status', enum: RefundStatus })
    status: RefundStatus;

    @OneToOne((type) => Transaction)
    @JoinColumn()
    transaction: Transaction;

    @ManyToOne((type) => User)
    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
