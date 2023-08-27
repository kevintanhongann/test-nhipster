import { IProductOrder } from '@/shared/model/product-order.model';
import { IRefund } from '@/shared/model/refund.model';

import { TransactionStatus } from '@/shared/model/enumerations/transaction-status.model';
export interface ITransaction {
  id?: number;
  code?: string;
  amount?: number;
  status?: TransactionStatus;
  productOrder?: IProductOrder | null;
  refund?: IRefund | null;
}

export class Transaction implements ITransaction {
  constructor(
    public id?: number,
    public code?: string,
    public amount?: number,
    public status?: TransactionStatus,
    public productOrder?: IProductOrder | null,
    public refund?: IRefund | null
  ) {}
}
