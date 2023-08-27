/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { AddressDTO } from './address.dto';

import { UserDTO } from './user.dto';

/**
 * A BuyerDTO object.
 */
export class BuyerDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'name field' })
    name: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'phone field' })
    phone: string;

    @ApiModelProperty({ description: 'avatarUrl field', required: false })
    avatarUrl: string;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    @ApiModelProperty({ type: AddressDTO, description: 'address relationship' })
    address: AddressDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
