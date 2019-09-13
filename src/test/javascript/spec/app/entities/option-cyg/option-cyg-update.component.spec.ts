/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CygTestModule } from '../../../test.module';
import { OptionCygUpdateComponent } from 'app/entities/option-cyg/option-cyg-update.component';
import { OptionCygService } from 'app/entities/option-cyg/option-cyg.service';
import { OptionCyg } from 'app/shared/model/option-cyg.model';

describe('Component Tests', () => {
  describe('OptionCyg Management Update Component', () => {
    let comp: OptionCygUpdateComponent;
    let fixture: ComponentFixture<OptionCygUpdateComponent>;
    let service: OptionCygService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CygTestModule],
        declarations: [OptionCygUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OptionCygUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OptionCygUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OptionCygService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OptionCyg(123);
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
        const entity = new OptionCyg();
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
