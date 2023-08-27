import { ProductShippingClass } from '../../domain/product-shipping-class.entity';
import { ProductShippingClassDTO } from '../dto/product-shipping-class.dto';

/**
 * A ProductShippingClass mapper object.
 */
export class ProductShippingClassMapper {
    static fromDTOtoEntity(entityDTO: ProductShippingClassDTO): ProductShippingClass {
        if (!entityDTO) {
            return;
        }
        let entity = new ProductShippingClass();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProductShippingClass): ProductShippingClassDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new ProductShippingClassDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
