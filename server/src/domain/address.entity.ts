/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Address.
 */
@Entity('address')
export class Address extends BaseEntity {
    @Column({ name: 'address_1' })
    address1: string;

    @Column({ name: 'address_2' })
    address2: string;

    @Column({ name: 'city' })
    city: string;

    @Column({ name: 'state' })
    state: string;

    @Column({ name: 'country' })
    country: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
