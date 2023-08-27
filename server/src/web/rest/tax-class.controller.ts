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
import { TaxClassDTO } from '../../service/dto/tax-class.dto';
import { TaxClassService } from '../../service/tax-class.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tax-classes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('tax-classes')
export class TaxClassController {
    logger = new Logger('TaxClassController');

    constructor(private readonly taxClassService: TaxClassService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: TaxClassDTO,
    })
    async getAll(@Req() req: Request): Promise<TaxClassDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.taxClassService.findAndCount({
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
        type: TaxClassDTO,
    })
    async getOne(@Param('id') id: number): Promise<TaxClassDTO> {
        return await this.taxClassService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create taxClass' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TaxClassDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() taxClassDTO: TaxClassDTO): Promise<TaxClassDTO> {
        const created = await this.taxClassService.save(taxClassDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TaxClass', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update taxClass' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TaxClassDTO,
    })
    async put(@Req() req: Request, @Body() taxClassDTO: TaxClassDTO): Promise<TaxClassDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TaxClass', taxClassDTO.id);
        return await this.taxClassService.update(taxClassDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update taxClass with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TaxClassDTO,
    })
    async putId(@Req() req: Request, @Body() taxClassDTO: TaxClassDTO): Promise<TaxClassDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TaxClass', taxClassDTO.id);
        return await this.taxClassService.update(taxClassDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete taxClass' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'TaxClass', id);
        return await this.taxClassService.deleteById(id);
    }
}
