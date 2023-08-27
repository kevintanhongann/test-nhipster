import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ItemDTO } from '../service/dto/item.dto';
import { ItemMapper } from '../service/mapper/item.mapper';
import { ItemRepository } from '../repository/item.repository';

const relationshipNames = [];
relationshipNames.push('productOrder');

@Injectable()
export class ItemService {
    logger = new Logger('ItemService');

    constructor(@InjectRepository(ItemRepository) private itemRepository: ItemRepository) {}

    async findById(id: number): Promise<ItemDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.itemRepository.findOne(id, options);
        return ItemMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ItemDTO>): Promise<ItemDTO | undefined> {
        const result = await this.itemRepository.findOne(options);
        return ItemMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ItemDTO>): Promise<[ItemDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.itemRepository.findAndCount(options);
        const itemDTO: ItemDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((item) => itemDTO.push(ItemMapper.fromEntityToDTO(item)));
            resultList[0] = itemDTO;
        }
        return resultList;
    }

    async save(itemDTO: ItemDTO, creator?: string): Promise<ItemDTO | undefined> {
        const entity = ItemMapper.fromDTOtoEntity(itemDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.itemRepository.save(entity);
        return ItemMapper.fromEntityToDTO(result);
    }

    async update(itemDTO: ItemDTO, updater?: string): Promise<ItemDTO | undefined> {
        const entity = ItemMapper.fromDTOtoEntity(itemDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.itemRepository.save(entity);
        return ItemMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.itemRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
