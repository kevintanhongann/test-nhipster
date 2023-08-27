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
import { ProductCategoryDTO } from '../../service/dto/product-category.dto';
import { ProductCategoryService } from '../../service/product-category.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-categories')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-categories')
export class ProductCategoryController {
    logger = new Logger('ProductCategoryController');

    constructor(private readonly productCategoryService: ProductCategoryService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductCategoryDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductCategoryDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productCategoryService.findAndCount({
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
        type: ProductCategoryDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductCategoryDTO> {
        return await this.productCategoryService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productCategory' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductCategoryDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productCategoryDTO: ProductCategoryDTO): Promise<ProductCategoryDTO> {
        const created = await this.productCategoryService.save(productCategoryDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductCategory', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productCategory' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductCategoryDTO,
    })
    async put(@Req() req: Request, @Body() productCategoryDTO: ProductCategoryDTO): Promise<ProductCategoryDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductCategory', productCategoryDTO.id);
        return await this.productCategoryService.update(productCategoryDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productCategory with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductCategoryDTO,
    })
    async putId(@Req() req: Request, @Body() productCategoryDTO: ProductCategoryDTO): Promise<ProductCategoryDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductCategory', productCategoryDTO.id);
        return await this.productCategoryService.update(productCategoryDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productCategory' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductCategory', id);
        return await this.productCategoryService.deleteById(id);
    }
}
