import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOfferCyg } from 'app/shared/model/offer-cyg.model';
import { OfferCygService } from './offer-cyg.service';

@Component({
  selector: 'jhi-offer-cyg-delete-dialog',
  templateUrl: './offer-cyg-delete-dialog.component.html'
})
export class OfferCygDeleteDialogComponent {
  offer: IOfferCyg;

  constructor(protected offerService: OfferCygService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.offerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'offerListModification',
        content: 'Deleted an offer'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-offer-cyg-delete-popup',
  template: ''
})
export class OfferCygDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ offer }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OfferCygDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.offer = offer;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/offer-cyg', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/offer-cyg', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
