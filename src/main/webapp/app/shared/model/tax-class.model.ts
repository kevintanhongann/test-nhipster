import { ITaxRate } from '@/shared/model/tax-rate.model';
import { IProduct } from '@/shared/model/product.model';

export interface ITaxClass {
  id?: number;
  name?: string;
  slug?: string;
  taxRates?: ITaxRate[] | null;
  products?: IProduct[] | null;
}

export class TaxClass implements ITaxClass {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public taxRates?: ITaxRate[] | null,
    public products?: IProduct[] | null
  ) {}
}
