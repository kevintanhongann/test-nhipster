import { EntityRepository, Repository } from 'typeorm';
import { TaxClass } from '../domain/tax-class.entity';

@EntityRepository(TaxClass)
export class TaxClassRepository extends Repository<TaxClass> {}
