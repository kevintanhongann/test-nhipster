/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Product } from './product.entity';

/**
 * A ProductImage.
 */
@Entity('product_image')
export class ProductImage extends BaseEntity {
    @Column({ name: 'filename' })
    filename: string;

    @Column({ name: 'url' })
    url: string;

    @Column({ name: 'mime_type' })
    mimeType: string;

    @ManyToOne((type) => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
