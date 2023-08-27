/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductOrderDTO } from './product-order.dto';
import { RefundDTO } from './refund.dto';
import { TransactionStatus } from '../../domain/enumeration/transaction-status';

/**
 * A TransactionDTO object.
 */
export class TransactionDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'code field' })
    code: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'amount field' })
    amount: number;

    @IsNotEmpty()
    @ApiModelProperty({ enum: TransactionStatus, description: 'status enum field' })
    status: TransactionStatus;

    @ApiModelProperty({ type: ProductOrderDTO, description: 'productOrder relationship' })
    productOrder: ProductOrderDTO;

    @ApiModelProperty({ type: RefundDTO, description: 'refund relationship' })
    refund: RefundDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
