import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRateController } from '../web/rest/tax-rate.controller';
import { TaxRateRepository } from '../repository/tax-rate.repository';
import { TaxRateService } from '../service/tax-rate.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaxRateRepository])],
    controllers: [TaxRateController],
    providers: [TaxRateService],
    exports: [TaxRateService],
})
export class TaxRateModule {}
