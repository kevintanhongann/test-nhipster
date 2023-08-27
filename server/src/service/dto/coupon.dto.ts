/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { DiscountType } from '../../domain/enumeration/discount-type';

/**
 * A CouponDTO object.
 */
export class CouponDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'code field' })
    code: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'amount field' })
    amount: number;

    @IsNotEmpty()
    @ApiModelProperty({ enum: DiscountType, description: 'discountType enum field' })
    discountType: DiscountType;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'description field' })
    description: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'expiry field' })
    expiry: any;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'individualUse field' })
    individualUse: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'usageLimit field' })
    usageLimit: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'usageLimitPerUser field' })
    usageLimitPerUser: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'freeShipping field' })
    freeShipping: boolean;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'minimumAmount field' })
    minimumAmount: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'maximumAmount field' })
    maximumAmount: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
