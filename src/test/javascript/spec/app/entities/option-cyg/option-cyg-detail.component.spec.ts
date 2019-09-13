/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CygTestModule } from '../../../test.module';
import { OptionCygDetailComponent } from 'app/entities/option-cyg/option-cyg-detail.component';
import { OptionCyg } from 'app/shared/model/option-cyg.model';

describe('Component Tests', () => {
  describe('OptionCyg Management Detail Component', () => {
    let comp: OptionCygDetailComponent;
    let fixture: ComponentFixture<OptionCygDetailComponent>;
    const route = ({ data: of({ option: new OptionCyg(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CygTestModule],
        declarations: [OptionCygDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OptionCygDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OptionCygDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.option).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
