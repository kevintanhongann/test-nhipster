/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { TaxRate } from './tax-rate.entity';
import { Product } from './product.entity';

/**
 * A TaxClass.
 */
@Entity('tax_class')
export class TaxClass extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'slug' })
    slug: string;

    @OneToMany((type) => TaxRate, (other) => other.taxClass)
    taxRates: TaxRate[];

    @OneToMany((type) => Product, (other) => other.taxClass)
    products: Product[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
