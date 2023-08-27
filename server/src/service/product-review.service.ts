import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductReviewDTO } from '../service/dto/product-review.dto';
import { ProductReviewMapper } from '../service/mapper/product-review.mapper';
import { ProductReviewRepository } from '../repository/product-review.repository';

const relationshipNames = [];
relationshipNames.push('product');

@Injectable()
export class ProductReviewService {
    logger = new Logger('ProductReviewService');

    constructor(@InjectRepository(ProductReviewRepository) private productReviewRepository: ProductReviewRepository) {}

    async findById(id: number): Promise<ProductReviewDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productReviewRepository.findOne(id, options);
        return ProductReviewMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductReviewDTO>): Promise<ProductReviewDTO | undefined> {
        const result = await this.productReviewRepository.findOne(options);
        return ProductReviewMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProductReviewDTO>): Promise<[ProductReviewDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productReviewRepository.findAndCount(options);
        const productReviewDTO: ProductReviewDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productReview) =>
                productReviewDTO.push(ProductReviewMapper.fromEntityToDTO(productReview)),
            );
            resultList[0] = productReviewDTO;
        }
        return resultList;
    }

    async save(productReviewDTO: ProductReviewDTO, creator?: string): Promise<ProductReviewDTO | undefined> {
        const entity = ProductReviewMapper.fromDTOtoEntity(productReviewDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productReviewRepository.save(entity);
        return ProductReviewMapper.fromEntityToDTO(result);
    }

    async update(productReviewDTO: ProductReviewDTO, updater?: string): Promise<ProductReviewDTO | undefined> {
        const entity = ProductReviewMapper.fromDTOtoEntity(productReviewDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productReviewRepository.save(entity);
        return ProductReviewMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productReviewRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
