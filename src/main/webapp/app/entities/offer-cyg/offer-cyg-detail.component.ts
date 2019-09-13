import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOfferCyg } from 'app/shared/model/offer-cyg.model';

@Component({
  selector: 'jhi-offer-cyg-detail',
  templateUrl: './offer-cyg-detail.component.html'
})
export class OfferCygDetailComponent implements OnInit {
  offer: IOfferCyg;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ offer }) => {
      this.offer = offer;
    });
  }

  previousState() {
    window.history.back();
  }
}
