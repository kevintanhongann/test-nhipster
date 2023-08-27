import { TaxClass } from '../../domain/tax-class.entity';
import { TaxClassDTO } from '../dto/tax-class.dto';

/**
 * A TaxClass mapper object.
 */
export class TaxClassMapper {
    static fromDTOtoEntity(entityDTO: TaxClassDTO): TaxClass {
        if (!entityDTO) {
            return;
        }
        let entity = new TaxClass();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TaxClass): TaxClassDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TaxClassDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
