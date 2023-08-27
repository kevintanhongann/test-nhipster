import { Refund } from '../../domain/refund.entity';
import { RefundDTO } from '../dto/refund.dto';

/**
 * A Refund mapper object.
 */
export class RefundMapper {
    static fromDTOtoEntity(entityDTO: RefundDTO): Refund {
        if (!entityDTO) {
            return;
        }
        let entity = new Refund();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Refund): RefundDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new RefundDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
