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
import { BuyerDTO } from '../../service/dto/buyer.dto';
import { BuyerService } from '../../service/buyer.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/buyers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('buyers')
export class BuyerController {
    logger = new Logger('BuyerController');

    constructor(private readonly buyerService: BuyerService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: BuyerDTO,
    })
    async getAll(@Req() req: Request): Promise<BuyerDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.buyerService.findAndCount({
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
        type: BuyerDTO,
    })
    async getOne(@Param('id') id: number): Promise<BuyerDTO> {
        return await this.buyerService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create buyer' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: BuyerDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() buyerDTO: BuyerDTO): Promise<BuyerDTO> {
        const created = await this.buyerService.save(buyerDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Buyer', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update buyer' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BuyerDTO,
    })
    async put(@Req() req: Request, @Body() buyerDTO: BuyerDTO): Promise<BuyerDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Buyer', buyerDTO.id);
        return await this.buyerService.update(buyerDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update buyer with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: BuyerDTO,
    })
    async putId(@Req() req: Request, @Body() buyerDTO: BuyerDTO): Promise<BuyerDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Buyer', buyerDTO.id);
        return await this.buyerService.update(buyerDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete buyer' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Buyer', id);
        return await this.buyerService.deleteById(id);
    }
}
