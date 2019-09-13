import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { IOptionCyg } from 'app/shared/model/option-cyg.model';
import { OptionCygService } from 'app/entities/option-cyg';
import { JhiEventManager } from 'ng-jhipster';
import { IOfferCyg } from 'app/shared/model/offer-cyg.model';
import { from } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-offer-cyg-deleteOp-dialog',
  templateUrl: 'offer-cyg-deleteOp-dialog.component.html'
})
export class OfferCygDeleteOpDialogComponent implements OnInit {
  option: IOptionCyg;
  optionId: number;
  offerId: number;

  constructor(protected optionService: OptionCygService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  ngOnInit(): void {
    this.optionService.find(this.optionId).subscribe((res: HttpResponse<IOptionCyg>) => (this.option = res.body));
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.optionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'offerListModification',
        content: 'Delete an option'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-offer-cyg-deleteOp',
  template: ''
})
export class OfferCygDeleteOpPopupComponent implements OnInit, OnDestroy {
  protected ngModalRef: NgbModalRef;

  option: IOptionCyg;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected optionService: OptionCygService
  ) {}

  ngOnInit(): void {
    //  console.log('El id de la opcion es : ' + this.activatedRoute.snapshot.paramMap.get('idOp'));
    /*this.activatedRoute.paramMap.subscribe(
           (res: UrlSegment[]) => console.log('***********************************la oferta es : ' + from(res).subscribe())
       );*/

    /*this.activatedRoute.paramMap.subscribe(
          param => console.log("*************************************************El id de la opcion es : " + param.get('idOf') )
      );*/

    this.activatedRoute.paramMap.subscribe(param => {
      setTimeout(() => {
        this.ngModalRef = this.modalService.open(OfferCygDeleteOpDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngModalRef.componentInstance.optionId = param.get('idOp');
        this.ngModalRef.result.then(
          result => {
            console.log('******************Eliminar opcion y nos vamos por result.');
            this.router.navigate(['offer-cyg' + param.get('idOf') + '/completeOffer', { outlets: { popup: null } }]);
            this.ngModalRef = null;
          },
          reason => {
            console.log('******************Eliminar opcion y nos vamos por reason.' + this.activatedRoute);
            this.router.navigate(['offer-cyg', param.get('idOf'), { outlets: { popup: null } }]);
            //this.router.navigateByUrl('/offer-cyg/' + param.get('idOf') + '/completeOffer');

            this.ngModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.ngModalRef = null;
  }
}
