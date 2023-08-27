/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductImageDTO } from './product-image.dto';
import { ProductAttributeDTO } from './product-attribute.dto';
import { ProductVariationDTO } from './product-variation.dto';
import { ProductTagDTO } from './product-tag.dto';
import { ProductCategoryDTO } from './product-category.dto';
import { ProductReviewDTO } from './product-review.dto';
import { ProductShippingClassDTO } from './product-shipping-class.dto';
import { TaxClassDTO } from './tax-class.dto';
import { TaxStatus } from '../../domain/enumeration/tax-status';
import { StockStatus } from '../../domain/enumeration/stock-status';
import { BackOrders } from '../../domain/enumeration/back-orders';
import { CatalogVisibility } from '../../domain/enumeration/catalog-visibility';

/**
 * A ProductDTO object.
 */
export class ProductDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'slug field' })
    slug: string;

    @ApiModelProperty({ description: 'skuNumber field', required: false })
    skuNumber: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'description field' })
    description: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'shortDescription field' })
    shortDescription: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'regularPrice field' })
    regularPrice: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'salePrice field' })
    salePrice: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'published field' })
    published: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'dateCreated field' })
    dateCreated: any;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'dateModified field' })
    dateModified: any;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'featured field' })
    featured: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ enum: TaxStatus, description: 'taxStatus enum field' })
    taxStatus: TaxStatus;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'manageStock field' })
    manageStock: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ enum: StockStatus, description: 'stockStatus enum field' })
    stockStatus: StockStatus;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'soldIndividually field' })
    soldIndividually: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ enum: BackOrders, description: 'backOrders enum field' })
    backOrders: BackOrders;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'weight field' })
    weight: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'virtual field' })
    virtual: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'downloadable field' })
    downloadable: boolean;

    @ApiModelProperty({ description: 'downloadLimit field', required: false })
    downloadLimit: number;

    @ApiModelProperty({ description: 'downloadExpiry field', required: false })
    downloadExpiry: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'shippingRequired field' })
    shippingRequired: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'shippingTaxable field' })
    shippingTaxable: boolean;

    @ApiModelProperty({ description: 'parentId field', required: false })
    parentId: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'purchaseNote field' })
    purchaseNote: string;

    @IsNotEmpty()
    @ApiModelProperty({ enum: CatalogVisibility, description: 'catalogVisibility enum field' })
    catalogVisibility: CatalogVisibility;

    @ApiModelProperty({ type: ProductImageDTO, isArray: true, description: 'productImages relationship' })
    productImages: ProductImageDTO[];

    @ApiModelProperty({ type: ProductAttributeDTO, isArray: true, description: 'productAttributes relationship' })
    productAttributes: ProductAttributeDTO[];

    @ApiModelProperty({ type: ProductVariationDTO, isArray: true, description: 'productVariations relationship' })
    productVariations: ProductVariationDTO[];

    @ApiModelProperty({ type: ProductTagDTO, isArray: true, description: 'productTags relationship' })
    productTags: ProductTagDTO[];

    @ApiModelProperty({ type: ProductCategoryDTO, isArray: true, description: 'productCategories relationship' })
    productCategories: ProductCategoryDTO[];

    @ApiModelProperty({ type: ProductReviewDTO, isArray: true, description: 'productReviews relationship' })
    productReviews: ProductReviewDTO[];

    @ApiModelProperty({ type: ProductShippingClassDTO, description: 'productShippingClass relationship' })
    productShippingClass: ProductShippingClassDTO;

    @ApiModelProperty({ type: TaxClassDTO, description: 'taxClass relationship' })
    taxClass: TaxClassDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
