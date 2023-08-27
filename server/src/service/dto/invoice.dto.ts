/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { InvoiceStatus } from '../../domain/enumeration/invoice-status';
import { PaymentMethod } from '../../domain/enumeration/payment-method';

/**
 * A InvoiceDTO object.
 */
export class InvoiceDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'code field' })
    code: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'date field' })
    date: any;

    @ApiModelProperty({ description: 'details field', required: false })
    details: string;

    @IsNotEmpty()
    @ApiModelProperty({ enum: InvoiceStatus, description: 'status enum field' })
    status: InvoiceStatus;

    @IsNotEmpty()
    @ApiModelProperty({ enum: PaymentMethod, description: 'paymentMethod enum field' })
    paymentMethod: PaymentMethod;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'paymentDate field' })
    paymentDate: any;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'paymentAmount field' })
    paymentAmount: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
