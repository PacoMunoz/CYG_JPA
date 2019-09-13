/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CygTestModule } from '../../../test.module';
import { OfferCygDeleteDialogComponent } from 'app/entities/offer-cyg/offer-cyg-delete-dialog.component';
import { OfferCygService } from 'app/entities/offer-cyg/offer-cyg.service';

describe('Component Tests', () => {
  describe('OfferCyg Management Delete Component', () => {
    let comp: OfferCygDeleteDialogComponent;
    let fixture: ComponentFixture<OfferCygDeleteDialogComponent>;
    let service: OfferCygService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CygTestModule],
        declarations: [OfferCygDeleteDialogComponent]
      })
        .overrideTemplate(OfferCygDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferCygDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferCygService);
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
