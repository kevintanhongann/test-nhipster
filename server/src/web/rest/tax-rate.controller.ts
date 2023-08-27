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
import { TaxRateDTO } from '../../service/dto/tax-rate.dto';
import { TaxRateService } from '../../service/tax-rate.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tax-rates')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('tax-rates')
export class TaxRateController {
    logger = new Logger('TaxRateController');

    constructor(private readonly taxRateService: TaxRateService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: TaxRateDTO,
    })
    async getAll(@Req() req: Request): Promise<TaxRateDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.taxRateService.findAndCount({
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
        type: TaxRateDTO,
    })
    async getOne(@Param('id') id: number): Promise<TaxRateDTO> {
        return await this.taxRateService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create taxRate' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: TaxRateDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() taxRateDTO: TaxRateDTO): Promise<TaxRateDTO> {
        const created = await this.taxRateService.save(taxRateDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TaxRate', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update taxRate' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TaxRateDTO,
    })
    async put(@Req() req: Request, @Body() taxRateDTO: TaxRateDTO): Promise<TaxRateDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TaxRate', taxRateDTO.id);
        return await this.taxRateService.update(taxRateDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update taxRate with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: TaxRateDTO,
    })
    async putId(@Req() req: Request, @Body() taxRateDTO: TaxRateDTO): Promise<TaxRateDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'TaxRate', taxRateDTO.id);
        return await this.taxRateService.update(taxRateDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete taxRate' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'TaxRate', id);
        return await this.taxRateService.deleteById(id);
    }
}
