import { ProductAttributeTerm } from '../../domain/product-attribute-term.entity';
import { ProductAttributeTermDTO } from '../dto/product-attribute-term.dto';

/**
 * A ProductAttributeTerm mapper object.
 */
export class ProductAttributeTermMapper {
    static fromDTOtoEntity(entityDTO: ProductAttributeTermDTO): ProductAttributeTerm {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductAttributeTerm();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductAttributeTerm): ProductAttributeTermDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductAttributeTermDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
