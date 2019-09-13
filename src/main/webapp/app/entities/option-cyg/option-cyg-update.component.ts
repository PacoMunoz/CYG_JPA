import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IOptionCyg, OptionCyg } from 'app/shared/model/option-cyg.model';
import { OptionCygService } from './option-cyg.service';
import { IOfferCyg } from 'app/shared/model/offer-cyg.model';
import { OfferCygService } from 'app/entities/offer-cyg';

@Component({
  selector: 'jhi-option-cyg-update',
  templateUrl: './option-cyg-update.component.html'
})
export class OptionCygUpdateComponent implements OnInit {
  isSaving: boolean;

  offers: IOfferCyg[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    image1: [null, []],
    image1ContentType: [],
    image2: [null, []],
    image2ContentType: [],
    image3: [null, []],
    image3ContentType: [],
    offer: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected optionService: OptionCygService,
    protected offerService: OfferCygService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ option }) => {
      this.updateForm(option);
    });
    this.offerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOfferCyg[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOfferCyg[]>) => response.body)
      )
      .subscribe((res: IOfferCyg[]) => (this.offers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(option: IOptionCyg) {
    this.editForm.patchValue({
      id: option.id,
      name: option.name,
      description: option.description,
      image1: option.image1,
      image1ContentType: option.image1ContentType,
      image2: option.image2,
      image2ContentType: option.image2ContentType,
      image3: option.image3,
      image3ContentType: option.image3ContentType,
      offer: option.offer
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const option = this.createFromForm();
    if (option.id !== undefined) {
      this.subscribeToSaveResponse(this.optionService.update(option));
    } else {
      this.subscribeToSaveResponse(this.optionService.create(option));
    }
  }

  private createFromForm(): IOptionCyg {
    return {
      ...new OptionCyg(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      image1ContentType: this.editForm.get(['image1ContentType']).value,
      image1: this.editForm.get(['image1']).value,
      image2ContentType: this.editForm.get(['image2ContentType']).value,
      image2: this.editForm.get(['image2']).value,
      image3ContentType: this.editForm.get(['image3ContentType']).value,
      image3: this.editForm.get(['image3']).value,
      offer: this.editForm.get(['offer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOptionCyg>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackOfferById(index: number, item: IOfferCyg) {
    return item.id;
  }
}
