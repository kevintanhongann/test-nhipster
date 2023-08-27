import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { RefundDTO } from '../service/dto/refund.dto';
import { RefundMapper } from '../service/mapper/refund.mapper';
import { RefundRepository } from '../repository/refund.repository';

const relationshipNames = [];
relationshipNames.push('user');

@Injectable()
export class RefundService {
    logger = new Logger('RefundService');

    constructor(@InjectRepository(RefundRepository) private refundRepository: RefundRepository) {}

    async findById(id: number): Promise<RefundDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.refundRepository.findOne(id, options);
        return RefundMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<RefundDTO>): Promise<RefundDTO | undefined> {
        const result = await this.refundRepository.findOne(options);
        return RefundMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<RefundDTO>): Promise<[RefundDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.refundRepository.findAndCount(options);
        const refundDTO: RefundDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((refund) => refundDTO.push(RefundMapper.fromEntityToDTO(refund)));
            resultList[0] = refundDTO;
        }
        return resultList;
    }

    async save(refundDTO: RefundDTO, creator?: string): Promise<RefundDTO | undefined> {
        const entity = RefundMapper.fromDTOtoEntity(refundDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.refundRepository.save(entity);
        return RefundMapper.fromEntityToDTO(result);
    }

    async update(refundDTO: RefundDTO, updater?: string): Promise<RefundDTO | undefined> {
        const entity = RefundMapper.fromDTOtoEntity(refundDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.refundRepository.save(entity);
        return RefundMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.refundRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
