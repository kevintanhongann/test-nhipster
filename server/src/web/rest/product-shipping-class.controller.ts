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
import { ProductShippingClassDTO } from '../../service/dto/product-shipping-class.dto';
import { ProductShippingClassService } from '../../service/product-shipping-class.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-shipping-classes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-shipping-classes')
export class ProductShippingClassController {
    logger = new Logger('ProductShippingClassController');

    constructor(private readonly productShippingClassService: ProductShippingClassService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductShippingClassDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductShippingClassDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productShippingClassService.findAndCount({
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
        type: ProductShippingClassDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductShippingClassDTO> {
        return await this.productShippingClassService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productShippingClass' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductShippingClassDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(
        @Req() req: Request,
        @Body() productShippingClassDTO: ProductShippingClassDTO,
    ): Promise<ProductShippingClassDTO> {
        const created = await this.productShippingClassService.save(productShippingClassDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductShippingClass', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productShippingClass' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductShippingClassDTO,
    })
    async put(
        @Req() req: Request,
        @Body() productShippingClassDTO: ProductShippingClassDTO,
    ): Promise<ProductShippingClassDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductShippingClass', productShippingClassDTO.id);
        return await this.productShippingClassService.update(productShippingClassDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productShippingClass with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductShippingClassDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() productShippingClassDTO: ProductShippingClassDTO,
    ): Promise<ProductShippingClassDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductShippingClass', productShippingClassDTO.id);
        return await this.productShippingClassService.update(productShippingClassDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productShippingClass' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductShippingClass', id);
        return await this.productShippingClassService.deleteById(id);
    }
}
