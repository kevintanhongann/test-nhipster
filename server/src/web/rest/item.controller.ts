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
import { ItemDTO } from '../../service/dto/item.dto';
import { ItemService } from '../../service/item.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('items')
export class ItemController {
    logger = new Logger('ItemController');

    constructor(private readonly itemService: ItemService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ItemDTO,
    })
    async getAll(@Req() req: Request): Promise<ItemDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.itemService.findAndCount({
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
        type: ItemDTO,
    })
    async getOne(@Param('id') id: number): Promise<ItemDTO> {
        return await this.itemService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create item' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ItemDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() itemDTO: ItemDTO): Promise<ItemDTO> {
        const created = await this.itemService.save(itemDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Item', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update item' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ItemDTO,
    })
    async put(@Req() req: Request, @Body() itemDTO: ItemDTO): Promise<ItemDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Item', itemDTO.id);
        return await this.itemService.update(itemDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update item with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ItemDTO,
    })
    async putId(@Req() req: Request, @Body() itemDTO: ItemDTO): Promise<ItemDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Item', itemDTO.id);
        return await this.itemService.update(itemDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete item' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Item', id);
        return await this.itemService.deleteById(id);
    }
}
