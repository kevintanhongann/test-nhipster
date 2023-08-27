/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { DiscountType } from './enumeration/discount-type';

/**
 * A Coupon.
 */
@Entity('coupon')
export class Coupon extends BaseEntity {
    @Column({ name: 'code' })
    code: string;

    @Column({ type: 'decimal', name: 'amount', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'simple-enum', name: 'discount_type', enum: DiscountType })
    discountType: DiscountType;

    @Column({ name: 'description' })
    description: string;

    @Column({ type: 'date', name: 'expiry' })
    expiry: any;

    @Column({ type: 'boolean', name: 'individual_use' })
    individualUse: boolean;

    @Column({ type: 'integer', name: 'usage_limit' })
    usageLimit: number;

    @Column({ type: 'integer', name: 'usage_limit_per_user' })
    usageLimitPerUser: number;

    @Column({ type: 'boolean', name: 'free_shipping' })
    freeShipping: boolean;

    @Column({ name: 'minimum_amount' })
    minimumAmount: string;

    @Column({ name: 'maximum_amount' })
    maximumAmount: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
