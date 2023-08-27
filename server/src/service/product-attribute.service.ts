import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductAttributeDTO } from '../service/dto/product-attribute.dto';
import { ProductAttributeMapper } from '../service/mapper/product-attribute.mapper';
import { ProductAttributeRepository } from '../repository/product-attribute.repository';

const relationshipNames = [];
relationshipNames.push('product');

@Injectable()
export class ProductAttributeService {
    logger = new Logger('ProductAttributeService');

    constructor(
        @InjectRepository(ProductAttributeRepository) private productAttributeRepository: ProductAttributeRepository,
    ) {}

    async findById(id: number): Promise<ProductAttributeDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productAttributeRepository.findOne(id, options);
        return ProductAttributeMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductAttributeDTO>): Promise<ProductAttributeDTO | undefined> {
        const result = await this.productAttributeRepository.findOne(options);
        return ProductAttributeMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProductAttributeDTO>): Promise<[ProductAttributeDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productAttributeRepository.findAndCount(options);
        const productAttributeDTO: ProductAttributeDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productAttribute) =>
                productAttributeDTO.push(ProductAttributeMapper.fromEntityToDTO(productAttribute)),
            );
            resultList[0] = productAttributeDTO;
        }
        return resultList;
    }

    async save(productAttributeDTO: ProductAttributeDTO, creator?: string): Promise<ProductAttributeDTO | undefined> {
        const entity = ProductAttributeMapper.fromDTOtoEntity(productAttributeDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productAttributeRepository.save(entity);
        return ProductAttributeMapper.fromEntityToDTO(result);
    }

    async update(productAttributeDTO: ProductAttributeDTO, updater?: string): Promise<ProductAttributeDTO | undefined> {
        const entity = ProductAttributeMapper.fromDTOtoEntity(productAttributeDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productAttributeRepository.save(entity);
        return ProductAttributeMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productAttributeRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
