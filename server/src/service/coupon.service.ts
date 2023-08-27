import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CouponDTO } from '../service/dto/coupon.dto';
import { CouponMapper } from '../service/mapper/coupon.mapper';
import { CouponRepository } from '../repository/coupon.repository';

const relationshipNames = [];

@Injectable()
export class CouponService {
    logger = new Logger('CouponService');

    constructor(@InjectRepository(CouponRepository) private couponRepository: CouponRepository) {}

    async findById(id: number): Promise<CouponDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.couponRepository.findOne(id, options);
        return CouponMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<CouponDTO>): Promise<CouponDTO | undefined> {
        const result = await this.couponRepository.findOne(options);
        return CouponMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CouponDTO>): Promise<[CouponDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.couponRepository.findAndCount(options);
        const couponDTO: CouponDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((coupon) => couponDTO.push(CouponMapper.fromEntityToDTO(coupon)));
            resultList[0] = couponDTO;
        }
        return resultList;
    }

    async save(couponDTO: CouponDTO, creator?: string): Promise<CouponDTO | undefined> {
        const entity = CouponMapper.fromDTOtoEntity(couponDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.couponRepository.save(entity);
        return CouponMapper.fromEntityToDTO(result);
    }

    async update(couponDTO: CouponDTO, updater?: string): Promise<CouponDTO | undefined> {
        const entity = CouponMapper.fromDTOtoEntity(couponDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.couponRepository.save(entity);
        return CouponMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.couponRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
