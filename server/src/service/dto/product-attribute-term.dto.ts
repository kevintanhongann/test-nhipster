/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductAttributeDTO } from './product-attribute.dto';

/**
 * A ProductAttributeTermDTO object.
 */
export class ProductAttributeTermDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'slug field' })
    slug: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'description field' })
    description: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'menuOrder field' })
    menuOrder: number;

    @ApiModelProperty({ type: ProductAttributeDTO, description: 'productAttribute relationship' })
    productAttribute: ProductAttributeDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
