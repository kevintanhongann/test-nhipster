import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProductReviewDTO } from '../../service/dto/product-review.dto';
import { ProductReviewService } from '../../service/product-review.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-reviews')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-reviews')
export class ProductReviewController {
    logger = new Logger('ProductReviewController');

    constructor(private readonly productReviewService: ProductReviewService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductReviewDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductReviewDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productReviewService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ProductReviewDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductReviewDTO> {
        return await this.productReviewService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productReview' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductReviewDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productReviewDTO: ProductReviewDTO): Promise<ProductReviewDTO> {
        const created = await this.productReviewService.save(productReviewDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductReview', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productReview' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductReviewDTO,
    })
    async put(@Req() req: Request, @Body() productReviewDTO: ProductReviewDTO): Promise<ProductReviewDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductReview', productReviewDTO.id);
        return await this.productReviewService.update(productReviewDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productReview with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductReviewDTO,
    })
    async putId(@Req() req: Request, @Body() productReviewDTO: ProductReviewDTO): Promise<ProductReviewDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductReview', productReviewDTO.id);
        return await this.productReviewService.update(productReviewDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productReview' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductReview', id);
        return await this.productReviewService.deleteById(id);
    }
}
