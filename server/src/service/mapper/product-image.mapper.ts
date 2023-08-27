import { ProductImage } from '../../domain/product-image.entity';
import { ProductImageDTO } from '../dto/product-image.dto';

/**
 * A ProductImage mapper object.
 */
export class ProductImageMapper {
    static fromDTOtoEntity(entityDTO: ProductImageDTO): ProductImage {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductImage();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductImage): ProductImageDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductImageDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
