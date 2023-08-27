import { ITransaction } from '@/shared/model/transaction.model';
import { IItem } from '@/shared/model/item.model';
import { IUser } from '@/shared/model/user.model';

import { OrderStatus } from '@/shared/model/enumerations/order-status.model';
import { DeliveryOption } from '@/shared/model/enumerations/delivery-option.model';
export interface IProductOrder {
  id?: number;
  placedDate?: Date;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number | null;
  deliveryOption?: DeliveryOption;
  transaction?: ITransaction;
  items?: IItem[] | null;
  user?: IUser;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: Date,
    public status?: OrderStatus,
    public code?: string,
    public invoiceId?: number | null,
    public deliveryOption?: DeliveryOption,
    public transaction?: ITransaction,
    public items?: IItem[] | null,
    public user?: IUser
  ) {}
}
