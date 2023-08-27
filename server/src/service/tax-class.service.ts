import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TaxClassDTO } from '../service/dto/tax-class.dto';
import { TaxClassMapper } from '../service/mapper/tax-class.mapper';
import { TaxClassRepository } from '../repository/tax-class.repository';

const relationshipNames = [];

@Injectable()
export class TaxClassService {
    logger = new Logger('TaxClassService');

    constructor(@InjectRepository(TaxClassRepository) private taxClassRepository: TaxClassRepository) {}

    async findById(id: number): Promise<TaxClassDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.taxClassRepository.findOne(id, options);
        return TaxClassMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<TaxClassDTO>): Promise<TaxClassDTO | undefined> {
        const result = await this.taxClassRepository.findOne(options);
        return TaxClassMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<TaxClassDTO>): Promise<[TaxClassDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.taxClassRepository.findAndCount(options);
        const taxClassDTO: TaxClassDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((taxClass) => taxClassDTO.push(TaxClassMapper.fromEntityToDTO(taxClass)));
            resultList[0] = taxClassDTO;
        }
        return resultList;
    }

    async save(taxClassDTO: TaxClassDTO, creator?: string): Promise<TaxClassDTO | undefined> {
        const entity = TaxClassMapper.fromDTOtoEntity(taxClassDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.taxClassRepository.save(entity);
        return TaxClassMapper.fromEntityToDTO(result);
    }

    async update(taxClassDTO: TaxClassDTO, updater?: string): Promise<TaxClassDTO | undefined> {
        const entity = TaxClassMapper.fromDTOtoEntity(taxClassDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.taxClassRepository.save(entity);
        return TaxClassMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.taxClassRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
