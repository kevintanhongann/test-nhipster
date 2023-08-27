/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { TransactionDTO } from './transaction.dto';
import { ItemDTO } from './item.dto';
import { OrderStatus } from '../../domain/enumeration/order-status';
import { DeliveryOption } from '../../domain/enumeration/delivery-option';

import { UserDTO } from './user.dto';

/**
 * A ProductOrderDTO object.
 */
export class ProductOrderDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'placedDate field' })
    placedDate: any;

    @IsNotEmpty()
    @ApiModelProperty({ enum: OrderStatus, description: 'status enum field' })
    status: OrderStatus;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'code field' })
    code: string;

    @ApiModelProperty({ description: 'invoiceId field', required: false })
    invoiceId: number;

    @IsNotEmpty()
    @ApiModelProperty({ enum: DeliveryOption, description: 'deliveryOption enum field' })
    deliveryOption: DeliveryOption;

    @ApiModelProperty({ type: TransactionDTO, description: 'transaction relationship' })
    transaction: TransactionDTO;

    @ApiModelProperty({ type: ItemDTO, isArray: true, description: 'items relationship' })
    items: ItemDTO[];

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
