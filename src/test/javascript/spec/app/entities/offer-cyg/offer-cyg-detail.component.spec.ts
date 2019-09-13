/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CygTestModule } from '../../../test.module';
import { OfferCygDetailComponent } from 'app/entities/offer-cyg/offer-cyg-detail.component';
import { OfferCyg } from 'app/shared/model/offer-cyg.model';

describe('Component Tests', () => {
  describe('OfferCyg Management Detail Component', () => {
    let comp: OfferCygDetailComponent;
    let fixture: ComponentFixture<OfferCygDetailComponent>;
    const route = ({ data: of({ offer: new OfferCyg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CygTestModule],
        declarations: [OfferCygDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OfferCygDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferCygDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.offer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
