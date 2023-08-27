/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TransactionDTO } from './transaction.dto';
import { RefundStatus } from '../../domain/enumeration/refund-status';

import { UserDTO } from './user.dto';

/**
 * A RefundDTO object.
 */
export class RefundDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'amount field' })
    amount: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'reason field' })
    reason: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'orderCode field' })
    orderCode: string;

    @IsNotEmpty()
    @ApiModelProperty({ enum: RefundStatus, description: 'status enum field' })
    status: RefundStatus;

    @ApiModelProperty({ type: TransactionDTO, description: 'transaction relationship' })
    transaction: TransactionDTO;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
