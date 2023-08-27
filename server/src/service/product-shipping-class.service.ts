import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductShippingClassDTO } from '../service/dto/product-shipping-class.dto';
import { ProductShippingClassMapper } from '../service/mapper/product-shipping-class.mapper';
import { ProductShippingClassRepository } from '../repository/product-shipping-class.repository';

const relationshipNames = [];

@Injectable()
export class ProductShippingClassService {
    logger = new Logger('ProductShippingClassService');

    constructor(
        @InjectRepository(ProductShippingClassRepository)
        private productShippingClassRepository: ProductShippingClassRepository,
    ) {}

    async findById(id: number): Promise<ProductShippingClassDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productShippingClassRepository.findOne(id, options);
        return ProductShippingClassMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductShippingClassDTO>): Promise<ProductShippingClassDTO | undefined> {
        const result = await this.productShippingClassRepository.findOne(options);
        return ProductShippingClassMapper.fromEntityToDTO(result);
    }

    async findAndCount(
        options: FindManyOptions<ProductShippingClassDTO>,
    ): Promise<[ProductShippingClassDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productShippingClassRepository.findAndCount(options);
        const productShippingClassDTO: ProductShippingClassDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productShippingClass) =>
                productShippingClassDTO.push(ProductShippingClassMapper.fromEntityToDTO(productShippingClass)),
            );
            resultList[0] = productShippingClassDTO;
        }
        return resultList;
    }

    async save(
        productShippingClassDTO: ProductShippingClassDTO,
        creator?: string,
    ): Promise<ProductShippingClassDTO | undefined> {
        const entity = ProductShippingClassMapper.fromDTOtoEntity(productShippingClassDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productShippingClassRepository.save(entity);
        return ProductShippingClassMapper.fromEntityToDTO(result);
    }

    async update(
        productShippingClassDTO: ProductShippingClassDTO,
        updater?: string,
    ): Promise<ProductShippingClassDTO | undefined> {
        const entity = ProductShippingClassMapper.fromDTOtoEntity(productShippingClassDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productShippingClassRepository.save(entity);
        return ProductShippingClassMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productShippingClassRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
