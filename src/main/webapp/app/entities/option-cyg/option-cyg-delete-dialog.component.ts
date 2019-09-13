import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOptionCyg } from 'app/shared/model/option-cyg.model';
import { OptionCygService } from './option-cyg.service';

@Component({
  selector: 'jhi-option-cyg-delete-dialog',
  templateUrl: './option-cyg-delete-dialog.component.html'
})
export class OptionCygDeleteDialogComponent {
  option: IOptionCyg;

  constructor(protected optionService: OptionCygService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.optionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'optionListModification',
        content: 'Deleted an option'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-option-cyg-delete-popup',
  template: ''
})
export class OptionCygDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ option }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OptionCygDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.option = option;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/option-cyg', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/option-cyg', { outlets: { popup: null } }]);
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
