import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductAttributeTermDTO } from '../service/dto/product-attribute-term.dto';
import { ProductAttributeTermMapper } from '../service/mapper/product-attribute-term.mapper';
import { ProductAttributeTermRepository } from '../repository/product-attribute-term.repository';

const relationshipNames = [];
relationshipNames.push('productAttribute');

@Injectable()
export class ProductAttributeTermService {
    logger = new Logger('ProductAttributeTermService');

    constructor(
        @InjectRepository(ProductAttributeTermRepository)
        private productAttributeTermRepository: ProductAttributeTermRepository,
    ) {}

    async findById(id: number): Promise<ProductAttributeTermDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productAttributeTermRepository.findOne(id, options);
        return ProductAttributeTermMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductAttributeTermDTO>): Promise<ProductAttributeTermDTO | undefined> {
        const result = await this.productAttributeTermRepository.findOne(options);
        return ProductAttributeTermMapper.fromEntityToDTO(result);
    }

    async findAndCount(
        options: FindManyOptions<ProductAttributeTermDTO>,
    ): Promise<[ProductAttributeTermDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productAttributeTermRepository.findAndCount(options);
        const productAttributeTermDTO: ProductAttributeTermDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productAttributeTerm) =>
                productAttributeTermDTO.push(ProductAttributeTermMapper.fromEntityToDTO(productAttributeTerm)),
            );
            resultList[0] = productAttributeTermDTO;
        }
        return resultList;
    }

    async save(
        productAttributeTermDTO: ProductAttributeTermDTO,
        creator?: string,
    ): Promise<ProductAttributeTermDTO | undefined> {
        const entity = ProductAttributeTermMapper.fromDTOtoEntity(productAttributeTermDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productAttributeTermRepository.save(entity);
        return ProductAttributeTermMapper.fromEntityToDTO(result);
    }

    async update(
        productAttributeTermDTO: ProductAttributeTermDTO,
        updater?: string,
    ): Promise<ProductAttributeTermDTO | undefined> {
        const entity = ProductAttributeTermMapper.fromDTOtoEntity(productAttributeTermDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productAttributeTermRepository.save(entity);
        return ProductAttributeTermMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productAttributeTermRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
