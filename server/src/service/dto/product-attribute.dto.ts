/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductAttributeTermDTO } from './product-attribute-term.dto';
import { ProductDTO } from './product.dto';

/**
 * A ProductAttributeDTO object.
 */
export class ProductAttributeDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'slug field' })
    slug: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'type field' })
    type: string;

    @ApiModelProperty({
        type: ProductAttributeTermDTO,
        isArray: true,
        description: 'productAttributeTerms relationship',
    })
    productAttributeTerms: ProductAttributeTermDTO[];

    @ApiModelProperty({ type: ProductDTO, description: 'product relationship' })
    product: ProductDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
