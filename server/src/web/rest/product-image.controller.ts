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
import { ProductImageDTO } from '../../service/dto/product-image.dto';
import { ProductImageService } from '../../service/product-image.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-images')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-images')
export class ProductImageController {
    logger = new Logger('ProductImageController');

    constructor(private readonly productImageService: ProductImageService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductImageDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductImageDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productImageService.findAndCount({
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
        type: ProductImageDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductImageDTO> {
        return await this.productImageService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productImage' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductImageDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productImageDTO: ProductImageDTO): Promise<ProductImageDTO> {
        const created = await this.productImageService.save(productImageDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductImage', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productImage' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductImageDTO,
    })
    async put(@Req() req: Request, @Body() productImageDTO: ProductImageDTO): Promise<ProductImageDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductImage', productImageDTO.id);
        return await this.productImageService.update(productImageDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productImage with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductImageDTO,
    })
    async putId(@Req() req: Request, @Body() productImageDTO: ProductImageDTO): Promise<ProductImageDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductImage', productImageDTO.id);
        return await this.productImageService.update(productImageDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productImage' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductImage', id);
        return await this.productImageService.deleteById(id);
    }
}
