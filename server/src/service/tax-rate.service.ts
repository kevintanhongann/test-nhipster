import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TaxRateDTO } from '../service/dto/tax-rate.dto';
import { TaxRateMapper } from '../service/mapper/tax-rate.mapper';
import { TaxRateRepository } from '../repository/tax-rate.repository';

const relationshipNames = [];
relationshipNames.push('taxClass');

@Injectable()
export class TaxRateService {
    logger = new Logger('TaxRateService');

    constructor(@InjectRepository(TaxRateRepository) private taxRateRepository: TaxRateRepository) {}

    async findById(id: number): Promise<TaxRateDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.taxRateRepository.findOne(id, options);
        return TaxRateMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<TaxRateDTO>): Promise<TaxRateDTO | undefined> {
        const result = await this.taxRateRepository.findOne(options);
        return TaxRateMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<TaxRateDTO>): Promise<[TaxRateDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.taxRateRepository.findAndCount(options);
        const taxRateDTO: TaxRateDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((taxRate) => taxRateDTO.push(TaxRateMapper.fromEntityToDTO(taxRate)));
            resultList[0] = taxRateDTO;
        }
        return resultList;
    }

    async save(taxRateDTO: TaxRateDTO, creator?: string): Promise<TaxRateDTO | undefined> {
        const entity = TaxRateMapper.fromDTOtoEntity(taxRateDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.taxRateRepository.save(entity);
        return TaxRateMapper.fromEntityToDTO(result);
    }

    async update(taxRateDTO: TaxRateDTO, updater?: string): Promise<TaxRateDTO | undefined> {
        const entity = TaxRateMapper.fromDTOtoEntity(taxRateDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.taxRateRepository.save(entity);
        return TaxRateMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.taxRateRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
