import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOptionCyg } from 'app/shared/model/option-cyg.model';

type EntityResponseType = HttpResponse<IOptionCyg>;
type EntityArrayResponseType = HttpResponse<IOptionCyg[]>;

@Injectable({ providedIn: 'root' })
export class OptionCygService {
  public resourceUrl = SERVER_API_URL + 'api/options';

  constructor(protected http: HttpClient) {}

  create(option: IOptionCyg): Observable<EntityResponseType> {
    return this.http.post<IOptionCyg>(this.resourceUrl, option, { observe: 'response' });
  }

  update(option: IOptionCyg): Observable<EntityResponseType> {
    return this.http.put<IOptionCyg>(this.resourceUrl, option, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOptionCyg>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOptionCyg[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
