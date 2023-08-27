/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { TaxClass } from './tax-class.entity';

/**
 * A TaxRate.
 */
@Entity('tax_rate')
export class TaxRate extends BaseEntity {
    @Column({ name: 'country' })
    country: string;

    @Column({ name: 'state' })
    state: string;

    @Column({ name: 'postcode' })
    postcode: string;

    @Column({ name: 'city' })
    city: string;

    @Column({ name: 'rate' })
    rate: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ type: 'boolean', name: 'shipping' })
    shipping: boolean;

    @Column({ type: 'boolean', name: 'compound' })
    compound: boolean;

    @Column({ type: 'integer', name: 'priority' })
    priority: number;

    @ManyToOne((type) => TaxClass)
    taxClass: TaxClass;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
