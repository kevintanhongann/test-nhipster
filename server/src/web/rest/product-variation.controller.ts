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
import { ProductVariationDTO } from '../../service/dto/product-variation.dto';
import { ProductVariationService } from '../../service/product-variation.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/product-variations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('product-variations')
export class ProductVariationController {
    logger = new Logger('ProductVariationController');

    constructor(private readonly productVariationService: ProductVariationService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProductVariationDTO,
    })
    async getAll(@Req() req: Request): Promise<ProductVariationDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.productVariationService.findAndCount({
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
        type: ProductVariationDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProductVariationDTO> {
        return await this.productVariationService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create productVariation' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProductVariationDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() productVariationDTO: ProductVariationDTO): Promise<ProductVariationDTO> {
        const created = await this.productVariationService.save(productVariationDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductVariation', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productVariation' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductVariationDTO,
    })
    async put(@Req() req: Request, @Body() productVariationDTO: ProductVariationDTO): Promise<ProductVariationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductVariation', productVariationDTO.id);
        return await this.productVariationService.update(productVariationDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update productVariation with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProductVariationDTO,
    })
    async putId(@Req() req: Request, @Body() productVariationDTO: ProductVariationDTO): Promise<ProductVariationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProductVariation', productVariationDTO.id);
        return await this.productVariationService.update(productVariationDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete productVariation' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProductVariation', id);
        return await this.productVariationService.deleteById(id);
    }
}
