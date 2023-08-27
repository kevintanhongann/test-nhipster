import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyerController } from '../web/rest/buyer.controller';
import { BuyerRepository } from '../repository/buyer.repository';
import { BuyerService } from '../service/buyer.service';

@Module({
    imports: [TypeOrmModule.forFeature([BuyerRepository])],
    controllers: [BuyerController],
    providers: [BuyerService],
    exports: [BuyerService],
})
export class BuyerModule {}
