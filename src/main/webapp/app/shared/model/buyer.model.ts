import { IUser } from '@/shared/model/user.model';
import { IAddress } from '@/shared/model/address.model';

export interface IBuyer {
  id?: number;
  name?: string;
  phone?: string;
  avatarUrl?: string | null;
  user?: IUser;
  address?: IAddress;
}

export class Buyer implements IBuyer {
  constructor(
    public id?: number,
    public name?: string,
    public phone?: string,
    public avatarUrl?: string | null,
    public user?: IUser,
    public address?: IAddress
  ) {}
}
