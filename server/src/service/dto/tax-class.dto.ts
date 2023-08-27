/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TaxRateDTO } from './tax-rate.dto';
import { ProductDTO } from './product.dto';

/**
 * A TaxClassDTO object.
 */
export class TaxClassDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'slug field' })
    slug: string;

    @ApiModelProperty({ type: TaxRateDTO, isArray: true, description: 'taxRates relationship' })
    taxRates: TaxRateDTO[];

    @ApiModelProperty({ type: ProductDTO, isArray: true, description: 'products relationship' })
    products: ProductDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
