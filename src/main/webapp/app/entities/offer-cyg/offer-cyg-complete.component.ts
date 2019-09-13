import { Component, OnInit } from '@angular/core';
import { IOfferCyg } from 'app/shared/model/offer-cyg.model';
import { ActivatedRoute } from '@angular/router';
import { OptionCygService } from 'app/entities/option-cyg';
import { IOptionCyg } from 'app/shared/model/option-cyg.model';
import { HttpResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { concat } from 'rxjs';

@Component({
  selector: 'jhi-offer-cyg-complete',
  templateUrl: './offer-cyg-complete.component.html'
})
export class OfferCygCompleteComponent implements OnInit {
  offer: IOfferCyg;
  options: IOptionCyg[];

  constructor(protected activatedRoute: ActivatedRoute, protected optionService: OptionCygService) {
    this.options = [];
  }

  ngOnInit(): void {
    /*this.activatedRoute.data.subscribe(
            ({offer}) => {
                this.offer = offer;
                this.optionService.query(
                    {
                        'offerId.equals': this.offer.id
                    }
                ).subscribe(
                    (res: HttpResponse<IOptionCyg[]>) => this.options = res.body,
                    () => console.log('Error')
                )
            }
        );*/
    this.activatedRoute.data
      .pipe(
        map(({ offer }) => {
          this.offer = offer;
        }),
        map(() =>
          this.optionService
            .query({
              'offer.equals': this.offer.id
            })
            .subscribe((res: HttpResponse<IOptionCyg[]>) => {
              this.options = res.body;
            })
        )
      )
      .subscribe();
    //You can try forkJoin, combineLatest, or withLatestFrom depending on your needs
    /*this.activatedRoute.data.subscribe(
            ({offer}) => {
                this.offer = offer;
            }
        ).add(
            this.optionService.query(
                {
                    'offerId.equals': this.offer.id
                }
            ).subscribe(
                (res: HttpResponse<IOptionCyg[]>) => this.options = res.body,
                () => console.log('Error')
            )
        );
        this.activatedRoute.data.pipe(
            finalize( () => {
                console.log('Finalize');
                this.optionService.query(
                    {
                        'offerId.equals' : this.offer.id
                    }
                ).subscribe(
                    (res: HttpResponse<IOptionCyg[]>) => this.options = res.body,
                    () => console.log('Error al recuperar las opciones de la oferta')
                )
            })
        ).subscribe(
            ({offer}) => {
                this.offer = offer;
                console.log('seteando el valor');
            }
        )*/
  }
}
