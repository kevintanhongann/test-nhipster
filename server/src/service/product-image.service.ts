import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductImageDTO } from '../service/dto/product-image.dto';
import { ProductImageMapper } from '../service/mapper/product-image.mapper';
import { ProductImageRepository } from '../repository/product-image.repository';

const relationshipNames = [];
relationshipNames.push('product');

@Injectable()
export class ProductImageService {
    logger = new Logger('ProductImageService');

    constructor(@InjectRepository(ProductImageRepository) private productImageRepository: ProductImageRepository) {}

    async findById(id: number): Promise<ProductImageDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productImageRepository.findOne(id, options);
        return ProductImageMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductImageDTO>): Promise<ProductImageDTO | undefined> {
        const result = await this.productImageRepository.findOne(options);
        return ProductImageMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProductImageDTO>): Promise<[ProductImageDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productImageRepository.findAndCount(options);
        const productImageDTO: ProductImageDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productImage) =>
                productImageDTO.push(ProductImageMapper.fromEntityToDTO(productImage)),
            );
            resultList[0] = productImageDTO;
        }
        return resultList;
    }

    async save(productImageDTO: ProductImageDTO, creator?: string): Promise<ProductImageDTO | undefined> {
        const entity = ProductImageMapper.fromDTOtoEntity(productImageDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productImageRepository.save(entity);
        return ProductImageMapper.fromEntityToDTO(result);
    }

    async update(productImageDTO: ProductImageDTO, updater?: string): Promise<ProductImageDTO | undefined> {
        const entity = ProductImageMapper.fromDTOtoEntity(productImageDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productImageRepository.save(entity);
        return ProductImageMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productImageRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
