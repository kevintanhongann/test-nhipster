/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ProductDTO } from './product.dto';
import { ReviewStatus } from '../../domain/enumeration/review-status';

/**
 * A ProductReviewDTO object.
 */
export class ProductReviewDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'reviewerName field' })
    reviewerName: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'reviewerEmail field' })
    reviewerEmail: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'review field' })
    review: string;

    @IsNotEmpty()
    @ApiModelProperty({ description: 'rating field' })
    rating: number;

    @IsNotEmpty()
    @ApiModelProperty({ enum: ReviewStatus, description: 'status enum field' })
    status: ReviewStatus;

    @ApiModelProperty({ type: ProductDTO, description: 'product relationship' })
    product: ProductDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
