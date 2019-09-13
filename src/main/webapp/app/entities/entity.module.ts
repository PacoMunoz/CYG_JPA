import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'offer-cyg',
        loadChildren: () => import('./offer-cyg/offer-cyg.module').then(m => m.CygOfferCygModule)
      },
      {
        path: 'option-cyg',
        loadChildren: () => import('./option-cyg/option-cyg.module').then(m => m.CygOptionCygModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CygEntityModule {}
