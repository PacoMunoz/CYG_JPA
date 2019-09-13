import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOptionCyg } from 'app/shared/model/option-cyg.model';

@Component({
  selector: 'jhi-option-cyg-detail',
  templateUrl: './option-cyg-detail.component.html'
})
export class OptionCygDetailComponent implements OnInit {
  option: IOptionCyg;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ option }) => {
      this.option = option;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
