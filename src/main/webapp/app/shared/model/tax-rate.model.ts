import { ITaxClass } from '@/shared/model/tax-class.model';

export interface ITaxRate {
  id?: number;
  country?: string;
  state?: string;
  postcode?: string;
  city?: string;
  rate?: string;
  name?: string;
  shipping?: boolean;
  compound?: boolean;
  priority?: number;
  taxClass?: ITaxClass;
}

export class TaxRate implements ITaxRate {
  constructor(
    public id?: number,
    public country?: string,
    public state?: string,
    public postcode?: string,
    public city?: string,
    public rate?: string,
    public name?: string,
    public shipping?: boolean,
    public compound?: boolean,
    public priority?: number,
    public taxClass?: ITaxClass
  ) {
    this.shipping = this.shipping ?? false;
    this.compound = this.compound ?? false;
  }
}
