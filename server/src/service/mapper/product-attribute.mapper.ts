import { ProductAttribute } from '../../domain/product-attribute.entity';
import { ProductAttributeDTO } from '../dto/product-attribute.dto';

/**
 * A ProductAttribute mapper object.
 */
export class ProductAttributeMapper {
    static fromDTOtoEntity(entityDTO: ProductAttributeDTO): ProductAttribute {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductAttribute();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductAttribute): ProductAttributeDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductAttributeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
