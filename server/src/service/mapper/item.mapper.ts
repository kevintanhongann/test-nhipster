import { Item } from '../../domain/item.entity';
import { ItemDTO } from '../dto/item.dto';

/**
 * A Item mapper object.
 */
export class ItemMapper {
    static fromDTOtoEntity(entityDTO: ItemDTO): Item {
        if (!entityDTO) {
            return;
        }
        let entity = new Item();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Item): ItemDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ItemDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
