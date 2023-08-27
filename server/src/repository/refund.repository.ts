import { EntityRepository, Repository } from 'typeorm';
import { Refund } from '../domain/refund.entity';

@EntityRepository(Refund)
export class RefundRepository extends Repository<Refund> {}
