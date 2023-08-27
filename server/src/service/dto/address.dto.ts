/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A AddressDTO object.
 */
export class AddressDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'address1 field' })
    address1: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'address2 field' })
    address2: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'city field' })
    city: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'state field' })
    state: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'country field' })
    country: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
