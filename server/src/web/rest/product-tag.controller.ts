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
import { ProductTagDTO } from '../../service/dto/product-tag.dto';
import { ProductTagService } from '../../service/product-tag.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-tags')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-tags')
export class ProductTagController {
    logger = new Logger('ProductTagController');

    constructor(private readonly productTagService: ProductTagService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductTagDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductTagDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productTagService.findAndCount({
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
        type: ProductTagDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductTagDTO> {
        return await this.productTagService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productTag' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductTagDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productTagDTO: ProductTagDTO): Promise<ProductTagDTO> {
        const created = await this.productTagService.save(productTagDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductTag', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productTag' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductTagDTO,
    })
    async put(@Req() req: Request, @Body() productTagDTO: ProductTagDTO): Promise<ProductTagDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductTag', productTagDTO.id);
        return await this.productTagService.update(productTagDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productTag with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductTagDTO,
    })
    async putId(@Req() req: Request, @Body() productTagDTO: ProductTagDTO): Promise<ProductTagDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductTag', productTagDTO.id);
        return await this.productTagService.update(productTagDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productTag' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductTag', id);
        return await this.productTagService.deleteById(id);
    }
}
