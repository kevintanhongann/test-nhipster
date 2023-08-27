import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductVariationDTO } from '../service/dto/product-variation.dto';
import { ProductVariationMapper } from '../service/mapper/product-variation.mapper';
import { ProductVariationRepository } from '../repository/product-variation.repository';

const relationshipNames = [];
relationshipNames.push('product');

@Injectable()
export class ProductVariationService {
    logger = new Logger('ProductVariationService');

    constructor(
        @InjectRepository(ProductVariationRepository) private productVariationRepository: ProductVariationRepository,
    ) {}

    async findById(id: number): Promise<ProductVariationDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productVariationRepository.findOne(id, options);
        return ProductVariationMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductVariationDTO>): Promise<ProductVariationDTO | undefined> {
        const result = await this.productVariationRepository.findOne(options);
        return ProductVariationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProductVariationDTO>): Promise<[ProductVariationDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productVariationRepository.findAndCount(options);
        const productVariationDTO: ProductVariationDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productVariation) =>
                productVariationDTO.push(ProductVariationMapper.fromEntityToDTO(productVariation)),
            );
            resultList[0] = productVariationDTO;
        }
        return resultList;
    }

    async save(productVariationDTO: ProductVariationDTO, creator?: string): Promise<ProductVariationDTO | undefined> {
        const entity = ProductVariationMapper.fromDTOtoEntity(productVariationDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productVariationRepository.save(entity);
        return ProductVariationMapper.fromEntityToDTO(result);
    }

    async update(productVariationDTO: ProductVariationDTO, updater?: string): Promise<ProductVariationDTO | undefined> {
        const entity = ProductVariationMapper.fromDTOtoEntity(productVariationDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productVariationRepository.save(entity);
        return ProductVariationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productVariationRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
