/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ProductImage } from './product-image.entity';
import { ProductAttribute } from './product-attribute.entity';
import { ProductVariation } from './product-variation.entity';
import { ProductTag } from './product-tag.entity';
import { ProductCategory } from './product-category.entity';
import { ProductReview } from './product-review.entity';
import { ProductShippingClass } from './product-shipping-class.entity';
import { TaxClass } from './tax-class.entity';
import { TaxStatus } from './enumeration/tax-status';
import { StockStatus } from './enumeration/stock-status';
import { BackOrders } from './enumeration/back-orders';
import { CatalogVisibility } from './enumeration/catalog-visibility';

/**
 * A Product.
 */
@Entity('product')
export class Product extends BaseEntity {
    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'slug' })
    slug: string;

    @Column({ name: 'sku_number', nullable: true })
    skuNumber: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'short_description' })
    shortDescription: string;

    @Column({ type: 'decimal', name: 'regular_price', precision: 10, scale: 2 })
    regularPrice: number;

    @Column({ type: 'decimal', name: 'sale_price', precision: 10, scale: 2 })
    salePrice: number;

    @Column({ type: 'boolean', name: 'published' })
    published: boolean;

    @Column({ type: 'datetime', name: 'date_created' })
    dateCreated: any;

    @Column({ type: 'date', name: 'date_modified' })
    dateModified: any;

    @Column({ type: 'boolean', name: 'featured' })
    featured: boolean;

    @Column({ type: 'simple-enum', name: 'tax_status', enum: TaxStatus })
    taxStatus: TaxStatus;

    @Column({ type: 'boolean', name: 'manage_stock' })
    manageStock: boolean;

    @Column({ type: 'simple-enum', name: 'stock_status', enum: StockStatus })
    stockStatus: StockStatus;

    @Column({ type: 'boolean', name: 'sold_individually' })
    soldIndividually: boolean;

    @Column({ type: 'simple-enum', name: 'back_orders', enum: BackOrders })
    backOrders: BackOrders;

    @Column({ type: 'double', name: 'weight' })
    weight: number;

    @Column({ type: 'boolean', name: 'virtual' })
    virtual: boolean;

    @Column({ type: 'boolean', name: 'downloadable' })
    downloadable: boolean;

    @Column({ type: 'integer', name: 'download_limit', nullable: true })
    downloadLimit: number;

    @Column({ type: 'integer', name: 'download_expiry', nullable: true })
    downloadExpiry: number;

    @Column({ type: 'boolean', name: 'shipping_required' })
    shippingRequired: boolean;

    @Column({ type: 'boolean', name: 'shipping_taxable' })
    shippingTaxable: boolean;

    @Column({ type: 'long', name: 'parent_id', nullable: true })
    parentId: number;

    @Column({ name: 'purchase_note' })
    purchaseNote: string;

    @Column({ type: 'simple-enum', name: 'catalog_visibility', enum: CatalogVisibility })
    catalogVisibility: CatalogVisibility;

    @OneToMany((type) => ProductImage, (other) => other.product)
    productImages: ProductImage[];

    @OneToMany((type) => ProductAttribute, (other) => other.product)
    productAttributes: ProductAttribute[];

    @OneToMany((type) => ProductVariation, (other) => other.product)
    productVariations: ProductVariation[];

    @OneToMany((type) => ProductTag, (other) => other.product)
    productTags: ProductTag[];

    @OneToMany((type) => ProductCategory, (other) => other.product)
    productCategories: ProductCategory[];

    @OneToMany((type) => ProductReview, (other) => other.product)
    productReviews: ProductReview[];

    @OneToOne((type) => ProductShippingClass)
    productShippingClass: ProductShippingClass;

    @ManyToOne((type) => TaxClass)
    taxClass: TaxClass;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
