export interface IAddress {
  id?: number;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public address1?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
    public country?: string
  ) {}
}
