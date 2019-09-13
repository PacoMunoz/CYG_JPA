/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CygTestModule } from '../../../test.module';
import { OptionCygDeleteDialogComponent } from 'app/entities/option-cyg/option-cyg-delete-dialog.component';
import { OptionCygService } from 'app/entities/option-cyg/option-cyg.service';

describe('Component Tests', () => {
  describe('OptionCyg Management Delete Component', () => {
    let comp: OptionCygDeleteDialogComponent;
    let fixture: ComponentFixture<OptionCygDeleteDialogComponent>;
    let service: OptionCygService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CygTestModule],
        declarations: [OptionCygDeleteDialogComponent]
      })
        .overrideTemplate(OptionCygDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OptionCygDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OptionCygService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
