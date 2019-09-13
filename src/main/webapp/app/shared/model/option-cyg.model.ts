import { IOfferCyg } from 'app/shared/model/offer-cyg.model';

export interface IOptionCyg {
  id?: number;
  name?: string;
  description?: string;
  image1ContentType?: string;
  image1?: any;
  image2ContentType?: string;
  image2?: any;
  image3ContentType?: string;
  image3?: any;
  offer?: IOfferCyg;
}

export class OptionCyg implements IOptionCyg {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public image1ContentType?: string,
    public image1?: any,
    public image2ContentType?: string,
    public image2?: any,
    public image3ContentType?: string,
    public image3?: any,
    public offer?: IOfferCyg
  ) {}
}
