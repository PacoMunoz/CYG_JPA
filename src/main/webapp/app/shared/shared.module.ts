import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CygSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CygSharedCommonModule],
  declarations: [HasAnyAuthorityDirective],
  exports: [CygSharedCommonModule, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CygSharedModule {
  static forRoot() {
    return {
      ngModule: CygSharedModule
    };
  }
}
