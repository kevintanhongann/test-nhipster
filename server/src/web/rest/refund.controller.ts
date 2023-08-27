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
import { RefundDTO } from '../../service/dto/refund.dto';
import { RefundService } from '../../service/refund.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/refunds')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('refunds')
export class RefundController {
    logger = new Logger('RefundController');

    constructor(private readonly refundService: RefundService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: RefundDTO,
    })
    async getAll(@Req() req: Request): Promise<RefundDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.refundService.findAndCount({
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
        type: RefundDTO,
    })
    async getOne(@Param('id') id: number): Promise<RefundDTO> {
        return await this.refundService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create refund' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: RefundDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() refundDTO: RefundDTO): Promise<RefundDTO> {
        const created = await this.refundService.save(refundDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Refund', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update refund' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: RefundDTO,
    })
    async put(@Req() req: Request, @Body() refundDTO: RefundDTO): Promise<RefundDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Refund', refundDTO.id);
        return await this.refundService.update(refundDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update refund with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: RefundDTO,
    })
    async putId(@Req() req: Request, @Body() refundDTO: RefundDTO): Promise<RefundDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Refund', refundDTO.id);
        return await this.refundService.update(refundDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete refund' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Refund', id);
        return await this.refundService.deleteById(id);
    }
}
