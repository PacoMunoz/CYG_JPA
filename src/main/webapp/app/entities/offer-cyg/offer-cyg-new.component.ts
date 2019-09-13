import { Component, OnInit } from '@angular/core';
import { OfferCygService } from 'app/entities/offer-cyg/offer-cyg.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IOfferCyg, OfferCyg } from 'app/shared/model/offer-cyg.model';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-offer-cyg-new',
  templateUrl: './offer-cyg-new.component.html'
})
export class OfferCygNewComponent implements OnInit {
  isSaving: boolean;

  newForm = this.fb.group({
    name: [null, [Validators.required]]
  });

  constructor(protected offerService: OfferCygService, protected fb: FormBuilder, protected router: Router) {}

  ngOnInit(): void {
    this.isSaving = false;
  }

  save() {
    this.isSaving = true;
    const offer = this.createFromForm();
    this.offerService
      .create(offer)
      .subscribe(
        (res: HttpResponse<IOfferCyg>) => this.router.navigate(['/offer-cyg', res.body.id, 'completeOffer']),
        () => (this.isSaving = false)
      );
  }

  private createFromForm(): IOfferCyg {
    return {
      ...new OfferCyg(),
      name: this.newForm.get(['name']).value
    };
  }

  previousState() {
    window.history.back();
  }
}
