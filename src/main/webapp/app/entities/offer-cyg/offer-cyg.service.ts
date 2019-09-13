import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOfferCyg } from 'app/shared/model/offer-cyg.model';

type EntityResponseType = HttpResponse<IOfferCyg>;
type EntityArrayResponseType = HttpResponse<IOfferCyg[]>;

@Injectable({ providedIn: 'root' })
export class OfferCygService {
  public resourceUrl = SERVER_API_URL + 'api/offers';

  constructor(protected http: HttpClient) {}

  create(offer: IOfferCyg): Observable<EntityResponseType> {
    return this.http.post<IOfferCyg>(this.resourceUrl, offer, { observe: 'response' });
  }

  update(offer: IOfferCyg): Observable<EntityResponseType> {
    return this.http.put<IOfferCyg>(this.resourceUrl, offer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOfferCyg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOfferCyg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
