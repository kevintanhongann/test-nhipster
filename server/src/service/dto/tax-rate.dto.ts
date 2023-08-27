/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TaxClassDTO } from './tax-class.dto';

/**
 * A TaxRateDTO object.
 */
export class TaxRateDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'country field' })
    country: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'state field' })
    state: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'postcode field' })
    postcode: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'city field' })
    city: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'rate field' })
    rate: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'shipping field' })
    shipping: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'compound field' })
    compound: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'priority field' })
    priority: number;

    @ApiModelProperty({ type: TaxClassDTO, description: 'taxClass relationship' })
    taxClass: TaxClassDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
