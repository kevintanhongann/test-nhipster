/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Address } from './address.entity';

import { User } from './user.entity';

/**
 * A Buyer.
 */
@Entity('buyer')
export class Buyer extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'phone' })
    phone: string;

    @Column({ name: 'avatar_url', nullable: true })
    avatarUrl: string;

    @OneToOne((type) => User)
    @JoinColumn()
    user: User;

    @OneToOne((type) => Address)
    @JoinColumn()
    address: Address;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
