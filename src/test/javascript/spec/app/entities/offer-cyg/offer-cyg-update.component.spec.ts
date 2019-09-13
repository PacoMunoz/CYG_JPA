/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CygTestModule } from '../../../test.module';
import { OfferCygUpdateComponent } from 'app/entities/offer-cyg/offer-cyg-update.component';
import { OfferCygService } from 'app/entities/offer-cyg/offer-cyg.service';
import { OfferCyg } from 'app/shared/model/offer-cyg.model';

describe('Component Tests', () => {
  describe('OfferCyg Management Update Component', () => {
    let comp: OfferCygUpdateComponent;
    let fixture: ComponentFixture<OfferCygUpdateComponent>;
    let service: OfferCygService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CygTestModule],
        declarations: [OfferCygUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OfferCygUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferCygUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferCygService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferCyg(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferCyg();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
