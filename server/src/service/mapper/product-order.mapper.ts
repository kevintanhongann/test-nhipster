import { ProductOrder } from '../../domain/product-order.entity';
import { ProductOrderDTO } from '../dto/product-order.dto';

/**
 * A ProductOrder mapper object.
 */
export class ProductOrderMapper {
    static fromDTOtoEntity(entityDTO: ProductOrderDTO): ProductOrder {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductOrder();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductOrder): ProductOrderDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductOrderDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
