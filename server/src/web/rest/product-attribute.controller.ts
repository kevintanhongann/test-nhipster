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
import { ProductAttributeDTO } from '../../service/dto/product-attribute.dto';
import { ProductAttributeService } from '../../service/product-attribute.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-attributes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-attributes')
export class ProductAttributeController {
    logger = new Logger('ProductAttributeController');

    constructor(private readonly productAttributeService: ProductAttributeService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductAttributeDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductAttributeDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productAttributeService.findAndCount({
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
        type: ProductAttributeDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductAttributeDTO> {
        return await this.productAttributeService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productAttribute' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductAttributeDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productAttributeDTO: ProductAttributeDTO): Promise<ProductAttributeDTO> {
        const created = await this.productAttributeService.save(productAttributeDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductAttribute', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productAttribute' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductAttributeDTO,
    })
    async put(@Req() req: Request, @Body() productAttributeDTO: ProductAttributeDTO): Promise<ProductAttributeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductAttribute', productAttributeDTO.id);
        return await this.productAttributeService.update(productAttributeDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productAttribute with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductAttributeDTO,
    })
    async putId(@Req() req: Request, @Body() productAttributeDTO: ProductAttributeDTO): Promise<ProductAttributeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductAttribute', productAttributeDTO.id);
        return await this.productAttributeService.update(productAttributeDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productAttribute' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductAttribute', id);
        return await this.productAttributeService.deleteById(id);
    }
}
