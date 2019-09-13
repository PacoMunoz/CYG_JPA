import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OfferCyg } from 'app/shared/model/offer-cyg.model';
import { OfferCygService } from './offer-cyg.service';
import { OfferCygComponent } from './offer-cyg.component';
import { OfferCygDetailComponent } from './offer-cyg-detail.component';
import { OfferCygUpdateComponent } from './offer-cyg-update.component';
import { OfferCygDeletePopupComponent } from './offer-cyg-delete-dialog.component';
import { IOfferCyg } from 'app/shared/model/offer-cyg.model';
import { OfferCygNewComponent } from 'app/entities/offer-cyg/offer-cyg-new.component';
import { OfferCygCompleteComponent } from 'app/entities/offer-cyg/offer-cyg-complete.component';
import { OfferCygDeleteOpPopupComponent } from 'app/entities/offer-cyg/offer-cyg-deleteOp-dialog.component';

@Injectable({ providedIn: 'root' })
export class OfferCygResolve implements Resolve<IOfferCyg> {
  constructor(private service: OfferCygService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOfferCyg> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OfferCyg>) => response.ok),
        map((offer: HttpResponse<OfferCyg>) => offer.body)
      );
    }
    return of(new OfferCyg());
  }
}

export const offerRoute: Routes = [
  {
    path: '',
    component: OfferCygComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OfferCygDetailComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OfferCygUpdateComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'newOffer',
    component: OfferCygNewComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/completeOffer',
    component: OfferCygCompleteComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OfferCygUpdateComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const offerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OfferCygDeletePopupComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':idOp/:idOf/deleteOp',
    component: OfferCygDeleteOpPopupComponent,
    resolve: {
      offer: OfferCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.offer.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
