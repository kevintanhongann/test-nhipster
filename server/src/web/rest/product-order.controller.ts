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
import { ProductOrderDTO } from '../../service/dto/product-order.dto';
import { ProductOrderService } from '../../service/product-order.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-orders')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-orders')
export class ProductOrderController {
    logger = new Logger('ProductOrderController');

    constructor(private readonly productOrderService: ProductOrderService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductOrderDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductOrderDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productOrderService.findAndCount({
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
        type: ProductOrderDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductOrderDTO> {
        return await this.productOrderService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productOrder' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductOrderDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productOrderDTO: ProductOrderDTO): Promise<ProductOrderDTO> {
        const created = await this.productOrderService.save(productOrderDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductOrder', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productOrder' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductOrderDTO,
    })
    async put(@Req() req: Request, @Body() productOrderDTO: ProductOrderDTO): Promise<ProductOrderDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductOrder', productOrderDTO.id);
        return await this.productOrderService.update(productOrderDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productOrder with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductOrderDTO,
    })
    async putId(@Req() req: Request, @Body() productOrderDTO: ProductOrderDTO): Promise<ProductOrderDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductOrder', productOrderDTO.id);
        return await this.productOrderService.update(productOrderDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productOrder' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductOrder', id);
        return await this.productOrderService.deleteById(id);
    }
}
