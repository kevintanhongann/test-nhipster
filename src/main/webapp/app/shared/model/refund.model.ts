import { ITransaction } from '@/shared/model/transaction.model';
import { IUser } from '@/shared/model/user.model';

import { RefundStatus } from '@/shared/model/enumerations/refund-status.model';
export interface IRefund {
  id?: number;
  amount?: number;
  reason?: string;
  orderCode?: string;
  status?: RefundStatus;
  transaction?: ITransaction;
  user?: IUser;
}

export class Refund implements IRefund {
  constructor(
    public id?: number,
    public amount?: number,
    public reason?: string,
    public orderCode?: string,
    public status?: RefundStatus,
    public transaction?: ITransaction,
    public user?: IUser
  ) {}
}
