import { Address } from '../../domain/address.entity';
import { AddressDTO } from '../dto/address.dto';

/**
 * A Address mapper object.
 */
export class AddressMapper {
    static fromDTOtoEntity(entityDTO: AddressDTO): Address {
        if (!entityDTO) {
            return;
        }
        let entity = new Address();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Address): AddressDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new AddressDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
