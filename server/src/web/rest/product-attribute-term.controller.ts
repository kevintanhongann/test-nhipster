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
import { ProductAttributeTermDTO } from '../../service/dto/product-attribute-term.dto';
import { ProductAttributeTermService } from '../../service/product-attribute-term.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-attribute-terms')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-attribute-terms')
export class ProductAttributeTermController {
    logger = new Logger('ProductAttributeTermController');

    constructor(private readonly productAttributeTermService: ProductAttributeTermService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductAttributeTermDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductAttributeTermDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productAttributeTermService.findAndCount({
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
        type: ProductAttributeTermDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductAttributeTermDTO> {
        return await this.productAttributeTermService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productAttributeTerm' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductAttributeTermDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(
        @Req() req: Request,
        @Body() productAttributeTermDTO: ProductAttributeTermDTO,
    ): Promise<ProductAttributeTermDTO> {
        const created = await this.productAttributeTermService.save(productAttributeTermDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductAttributeTerm', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productAttributeTerm' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductAttributeTermDTO,
    })
    async put(
        @Req() req: Request,
        @Body() productAttributeTermDTO: ProductAttributeTermDTO,
    ): Promise<ProductAttributeTermDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductAttributeTerm', productAttributeTermDTO.id);
        return await this.productAttributeTermService.update(productAttributeTermDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productAttributeTerm with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductAttributeTermDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() productAttributeTermDTO: ProductAttributeTermDTO,
    ): Promise<ProductAttributeTermDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductAttributeTerm', productAttributeTermDTO.id);
        return await this.productAttributeTermService.update(productAttributeTermDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productAttributeTerm' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductAttributeTerm', id);
        return await this.productAttributeTermService.deleteById(id);
    }
}
