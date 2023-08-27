import { Buyer } from '../../domain/buyer.entity';
import { BuyerDTO } from '../dto/buyer.dto';

/**
 * A Buyer mapper object.
 */
export class BuyerMapper {
    static fromDTOtoEntity(entityDTO: BuyerDTO): Buyer {
        if (!entityDTO) {
            return;
        }
        let entity = new Buyer();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Buyer): BuyerDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new BuyerDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
