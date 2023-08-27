import { EntityRepository, Repository } from 'typeorm';
import { Buyer } from '../domain/buyer.entity';

@EntityRepository(Buyer)
export class BuyerRepository extends Repository<Buyer> {}
