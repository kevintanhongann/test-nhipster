import { ProductTag } from '../../domain/product-tag.entity';
import { ProductTagDTO } from '../dto/product-tag.dto';

/**
 * A ProductTag mapper object.
 */
export class ProductTagMapper {
    static fromDTOtoEntity(entityDTO: ProductTagDTO): ProductTag {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductTag();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductTag): ProductTagDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductTagDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
