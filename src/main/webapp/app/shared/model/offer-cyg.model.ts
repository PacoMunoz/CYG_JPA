import { IOptionCyg } from 'app/shared/model/option-cyg.model';

export interface IOfferCyg {
  id?: number;
  name?: string;
  options?: IOptionCyg[];
}

export class OfferCyg implements IOfferCyg {
  constructor(public id?: number, public name?: string, public options?: IOptionCyg[]) {}
}
