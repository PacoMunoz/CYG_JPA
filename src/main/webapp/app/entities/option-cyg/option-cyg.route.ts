import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OptionCyg } from 'app/shared/model/option-cyg.model';
import { OptionCygService } from './option-cyg.service';
import { OptionCygComponent } from './option-cyg.component';
import { OptionCygDetailComponent } from './option-cyg-detail.component';
import { OptionCygUpdateComponent } from './option-cyg-update.component';
import { OptionCygDeletePopupComponent } from './option-cyg-delete-dialog.component';
import { IOptionCyg } from 'app/shared/model/option-cyg.model';

@Injectable({ providedIn: 'root' })
export class OptionCygResolve implements Resolve<IOptionCyg> {
  constructor(private service: OptionCygService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOptionCyg> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OptionCyg>) => response.ok),
        map((option: HttpResponse<OptionCyg>) => option.body)
      );
    }
    return of(new OptionCyg());
  }
}

export const optionRoute: Routes = [
  {
    path: '',
    component: OptionCygComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.option.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OptionCygDetailComponent,
    resolve: {
      option: OptionCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.option.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OptionCygUpdateComponent,
    resolve: {
      option: OptionCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.option.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OptionCygUpdateComponent,
    resolve: {
      option: OptionCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.option.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const optionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OptionCygDeletePopupComponent,
    resolve: {
      option: OptionCygResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'cygApp.option.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
