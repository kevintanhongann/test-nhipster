/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductDTO } from './product.dto';

/**
 * A ProductShippingClassDTO object.
 */
export class ProductShippingClassDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'slug field' })
    slug: string;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ description: 'count field', required: false })
    count: number;

    @ApiModelProperty({ type: ProductDTO, description: 'product relationship' })
    product: ProductDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
