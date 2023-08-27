import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductTagDTO } from '../service/dto/product-tag.dto';
import { ProductTagMapper } from '../service/mapper/product-tag.mapper';
import { ProductTagRepository } from '../repository/product-tag.repository';

const relationshipNames = [];
relationshipNames.push('product');

@Injectable()
export class ProductTagService {
    logger = new Logger('ProductTagService');

    constructor(@InjectRepository(ProductTagRepository) private productTagRepository: ProductTagRepository) {}

    async findById(id: number): Promise<ProductTagDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productTagRepository.findOne(id, options);
        return ProductTagMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductTagDTO>): Promise<ProductTagDTO | undefined> {
        const result = await this.productTagRepository.findOne(options);
        return ProductTagMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProductTagDTO>): Promise<[ProductTagDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productTagRepository.findAndCount(options);
        const productTagDTO: ProductTagDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productTag) => productTagDTO.push(ProductTagMapper.fromEntityToDTO(productTag)));
            resultList[0] = productTagDTO;
        }
        return resultList;
    }

    async save(productTagDTO: ProductTagDTO, creator?: string): Promise<ProductTagDTO | undefined> {
        const entity = ProductTagMapper.fromDTOtoEntity(productTagDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productTagRepository.save(entity);
        return ProductTagMapper.fromEntityToDTO(result);
    }

    async update(productTagDTO: ProductTagDTO, updater?: string): Promise<ProductTagDTO | undefined> {
        const entity = ProductTagMapper.fromDTOtoEntity(productTagDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productTagRepository.save(entity);
        return ProductTagMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productTagRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
