/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductOrderDTO } from './product-order.dto';

/**
 * A ItemDTO object.
 */
export class ItemDTO extends BaseDTO {
    @IsNotEmpty()
    @Min(0)
    @ApiModelProperty({ description: 'quantity field' })
    quantity: number;

    @IsNotEmpty()
    @Min(0)
    @ApiModelProperty({ description: 'totalPrice field' })
    totalPrice: number;

    @ApiModelProperty({ type: ProductOrderDTO, description: 'productOrder relationship' })
    productOrder: ProductOrderDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
