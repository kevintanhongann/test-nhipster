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
import { CouponDTO } from '../../service/dto/coupon.dto';
import { CouponService } from '../../service/coupon.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/coupons')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('coupons')
export class CouponController {
    logger = new Logger('CouponController');

    constructor(private readonly couponService: CouponService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CouponDTO,
    })
    async getAll(@Req() req: Request): Promise<CouponDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.couponService.findAndCount({
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
        type: CouponDTO,
    })
    async getOne(@Param('id') id: number): Promise<CouponDTO> {
        return await this.couponService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create coupon' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CouponDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() couponDTO: CouponDTO): Promise<CouponDTO> {
        const created = await this.couponService.save(couponDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Coupon', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update coupon' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CouponDTO,
    })
    async put(@Req() req: Request, @Body() couponDTO: CouponDTO): Promise<CouponDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Coupon', couponDTO.id);
        return await this.couponService.update(couponDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update coupon with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CouponDTO,
    })
    async putId(@Req() req: Request, @Body() couponDTO: CouponDTO): Promise<CouponDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Coupon', couponDTO.id);
        return await this.couponService.update(couponDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete coupon' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Coupon', id);
        return await this.couponService.deleteById(id);
    }
}
