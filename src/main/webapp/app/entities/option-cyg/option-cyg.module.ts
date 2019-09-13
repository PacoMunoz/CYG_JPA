import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CygSharedModule } from 'app/shared';
import {
  OptionCygComponent,
  OptionCygDetailComponent,
  OptionCygUpdateComponent,
  OptionCygDeletePopupComponent,
  OptionCygDeleteDialogComponent,
  optionRoute,
  optionPopupRoute
} from './';

const ENTITY_STATES = [...optionRoute, ...optionPopupRoute];

@NgModule({
  imports: [CygSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OptionCygComponent,
    OptionCygDetailComponent,
    OptionCygUpdateComponent,
    OptionCygDeleteDialogComponent,
    OptionCygDeletePopupComponent
  ],
  entryComponents: [OptionCygComponent, OptionCygUpdateComponent, OptionCygDeleteDialogComponent, OptionCygDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CygOptionCygModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
