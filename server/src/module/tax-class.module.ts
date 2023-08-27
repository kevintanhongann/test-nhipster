import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxClassController } from '../web/rest/tax-class.controller';
import { TaxClassRepository } from '../repository/tax-class.repository';
import { TaxClassService } from '../service/tax-class.service';

@Module({
    imports: [TypeOrmModule.forFeature([TaxClassRepository])],
    controllers: [TaxClassController],
    providers: [TaxClassService],
    exports: [TaxClassService],
})
export class TaxClassModule {}
