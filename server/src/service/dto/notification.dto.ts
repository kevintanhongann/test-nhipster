/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { NotificationType } from '../../domain/enumeration/notification-type';

import { UserDTO } from './user.dto';

/**
 * A NotificationDTO object.
 */
export class NotificationDTO extends BaseDTO {
    @ApiModelProperty({ description: 'details field', required: false })
    details: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'sentDate field' })
    sentDate: any;

    @IsNotEmpty()
    @ApiModelProperty({ enum: NotificationType, description: 'format enum field' })
    format: NotificationType;

    @ApiModelProperty({ description: 'googleNotificationId field', required: false })
    googleNotificationId: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'productId field' })
    productId: number;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'read field' })
    read: boolean;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
