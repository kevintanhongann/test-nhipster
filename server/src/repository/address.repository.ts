import { EntityRepository, Repository } from 'typeorm';
import { Address } from '../domain/address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
