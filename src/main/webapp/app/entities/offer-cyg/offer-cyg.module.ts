import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CygSharedModule } from 'app/shared';
import {
  OfferCygComponent,
  OfferCygDetailComponent,
  OfferCygUpdateComponent,
  OfferCygDeletePopupComponent,
  OfferCygDeleteDialogComponent,
  offerRoute,
  offerPopupRoute
} from './';
import { OfferCygNewComponent } from 'app/entities/offer-cyg/offer-cyg-new.component';
import { OfferCygCompleteComponent } from 'app/entities/offer-cyg/offer-cyg-complete.component';
import {
  OfferCygDeleteOpDialogComponent,
  OfferCygDeleteOpPopupComponent
} from 'app/entities/offer-cyg/offer-cyg-deleteOp-dialog.component';

const ENTITY_STATES = [...offerRoute, ...offerPopupRoute];

@NgModule({
  imports: [CygSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OfferCygComponent,
    OfferCygDetailComponent,
    OfferCygUpdateComponent,
    OfferCygDeleteDialogComponent,
    OfferCygDeletePopupComponent,
    OfferCygNewComponent,
    OfferCygCompleteComponent,
    OfferCygDeleteOpPopupComponent,
    OfferCygDeleteOpDialogComponent
  ],
  entryComponents: [
    OfferCygComponent,
    OfferCygUpdateComponent,
    OfferCygDeleteDialogComponent,
    OfferCygDeletePopupComponent,
    OfferCygDeleteOpPopupComponent,
    OfferCygDeleteOpDialogComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CygOfferCygModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
