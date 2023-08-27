import { Coupon } from '../../domain/coupon.entity';
import { CouponDTO } from '../dto/coupon.dto';

/**
 * A Coupon mapper object.
 */
export class CouponMapper {
    static fromDTOtoEntity(entityDTO: CouponDTO): Coupon {
        if (!entityDTO) {
            return;
        }
        let entity = new Coupon();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach((field) => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Coupon): CouponDTO {
        if (!entity) {
            return;
        }
        let entityDTO = new CouponDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach((field) => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
