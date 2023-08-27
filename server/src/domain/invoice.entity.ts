/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { InvoiceStatus } from './enumeration/invoice-status';
import { PaymentMethod } from './enumeration/payment-method';

/**
 * A Invoice.
 */
@Entity('invoice')
export class Invoice extends BaseEntity {
    @Column({ name: 'code' })
    code: string;

    @Column({ type: 'datetime', name: 'date' })
    date: any;

    @Column({ name: 'details', nullable: true })
    details: string;

    @Column({ type: 'simple-enum', name: 'status', enum: InvoiceStatus })
    status: InvoiceStatus;

    @Column({ type: 'simple-enum', name: 'payment_method', enum: PaymentMethod })
    paymentMethod: PaymentMethod;

    @Column({ type: 'datetime', name: 'payment_date' })
    paymentDate: any;

    @Column({ type: 'decimal', name: 'payment_amount', precision: 10, scale: 2 })
    paymentAmount: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
