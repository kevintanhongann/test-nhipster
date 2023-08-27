import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BuyerDTO } from '../service/dto/buyer.dto';
import { BuyerMapper } from '../service/mapper/buyer.mapper';
import { BuyerRepository } from '../repository/buyer.repository';

const relationshipNames = [];

@Injectable()
export class BuyerService {
    logger = new Logger('BuyerService');

    constructor(@InjectRepository(BuyerRepository) private buyerRepository: BuyerRepository) {}

    async findById(id: number): Promise<BuyerDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.buyerRepository.findOne(id, options);
        return BuyerMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<BuyerDTO>): Promise<BuyerDTO | undefined> {
        const result = await this.buyerRepository.findOne(options);
        return BuyerMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<BuyerDTO>): Promise<[BuyerDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.buyerRepository.findAndCount(options);
        const buyerDTO: BuyerDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((buyer) => buyerDTO.push(BuyerMapper.fromEntityToDTO(buyer)));
            resultList[0] = buyerDTO;
        }
        return resultList;
    }

    async save(buyerDTO: BuyerDTO, creator?: string): Promise<BuyerDTO | undefined> {
        const entity = BuyerMapper.fromDTOtoEntity(buyerDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.buyerRepository.save(entity);
        return BuyerMapper.fromEntityToDTO(result);
    }

    async update(buyerDTO: BuyerDTO, updater?: string): Promise<BuyerDTO | undefined> {
        const entity = BuyerMapper.fromDTOtoEntity(buyerDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.buyerRepository.save(entity);
        return BuyerMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.buyerRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
