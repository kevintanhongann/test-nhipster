import { EntityRepository, Repository } from 'typeorm';
import { TaxRate } from '../domain/tax-rate.entity';

@EntityRepository(TaxRate)
export class TaxRateRepository extends Repository<TaxRate> {}
