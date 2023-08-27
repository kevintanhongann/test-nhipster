import { TaxRate } from '../../domain/tax-rate.entity';
import { TaxRateDTO } from '../dto/tax-rate.dto';

/**
 * A TaxRate mapper object.
 */
export class TaxRateMapper {
    static fromDTOtoEntity(entityDTO: TaxRateDTO): TaxRate {
        if (!entityDTO) {
            return;
        }
        let entity = new TaxRate();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: TaxRate): TaxRateDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new TaxRateDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
