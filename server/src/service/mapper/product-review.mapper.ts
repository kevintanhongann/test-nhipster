import { ProductReview } from '../../domain/product-review.entity';
import { ProductReviewDTO } from '../dto/product-review.dto';

/**
 * A ProductReview mapper object.
 */
export class ProductReviewMapper {
    static fromDTOtoEntity(entityDTO: ProductReviewDTO): ProductReview {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductReview();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductReview): ProductReviewDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductReviewDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
