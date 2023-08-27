/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductDTO } from './product.dto';

/**
 * A ProductImageDTO object.
 */
export class ProductImageDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'filename field' })
    filename: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'url field' })
    url: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'mimeType field' })
    mimeType: string;

    @ApiModelProperty({ type: ProductDTO, description: 'product relationship' })
    product: ProductDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
