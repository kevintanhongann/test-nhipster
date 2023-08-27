import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundController } from '../web/rest/refund.controller';
import { RefundRepository } from '../repository/refund.repository';
import { RefundService } from '../service/refund.service';

@Module({
    imports: [TypeOrmModule.forFeature([RefundRepository])],
    controllers: [RefundController],
    providers: [RefundService],
    exports: [RefundService],
})
export class RefundModule {}
