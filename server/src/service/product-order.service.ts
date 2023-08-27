import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductOrderDTO } from '../service/dto/product-order.dto';
import { ProductOrderMapper } from '../service/mapper/product-order.mapper';
import { ProductOrderRepository } from '../repository/product-order.repository';

const relationshipNames = [];
relationshipNames.push('user');

@Injectable()
export class ProductOrderService {
    logger = new Logger('ProductOrderService');

    constructor(@InjectRepository(ProductOrderRepository) private productOrderRepository: ProductOrderRepository) {}

    async findById(id: number): Promise<ProductOrderDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productOrderRepository.findOne(id, options);
        return ProductOrderMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProductOrderDTO>): Promise<ProductOrderDTO | undefined> {
        const result = await this.productOrderRepository.findOne(options);
        return ProductOrderMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProductOrderDTO>): Promise<[ProductOrderDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productOrderRepository.findAndCount(options);
        const productOrderDTO: ProductOrderDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((productOrder) =>
                productOrderDTO.push(ProductOrderMapper.fromEntityToDTO(productOrder)),
            );
            resultList[0] = productOrderDTO;
        }
        return resultList;
    }

    async save(productOrderDTO: ProductOrderDTO, creator?: string): Promise<ProductOrderDTO | undefined> {
        const entity = ProductOrderMapper.fromDTOtoEntity(productOrderDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productOrderRepository.save(entity);
        return ProductOrderMapper.fromEntityToDTO(result);
    }

    async update(productOrderDTO: ProductOrderDTO, updater?: string): Promise<ProductOrderDTO | undefined> {
        const entity = ProductOrderMapper.fromDTOtoEntity(productOrderDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productOrderRepository.save(entity);
        return ProductOrderMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.productOrderRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
