import { ProductVariation } from '../../domain/product-variation.entity';
import { ProductVariationDTO } from '../dto/product-variation.dto';

/**
 * A ProductVariation mapper object.
 */
export class ProductVariationMapper {
    static fromDTOtoEntity(entityDTO: ProductVariationDTO): ProductVariation {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductVariation();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductVariation): ProductVariationDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductVariationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
