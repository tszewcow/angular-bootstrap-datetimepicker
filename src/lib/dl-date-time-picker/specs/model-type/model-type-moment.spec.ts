/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import * as _moment from 'moment';
import {Moment} from 'moment';
import {DlDateTimeMomentModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';

/**
 * Work around for moment namespace conflict when used with webpack and rollup.
 * See https://github.com/dherges/ng-packagr/issues/163
 *
 * Depending on whether rollup is used, moment needs to be imported differently.
 * Since Moment.js doesn't have a default export, we normally need to import using
 * the `* as`syntax.
 *
 * rollup creates a synthetic default module and we thus need to import it using
 * the `default as` syntax.
 *
 * @internal
 **/
const moment = _moment;

@Component({
  template: '<dl-date-time-picker minView="day"></dl-date-time-picker>'
})
class ModelTypeComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<Moment>;
}

describe('DlDateTimePickerComponent modelType', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DlDateTimeMomentModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        ModelTypeComponent,
      ]
    }).compileComponents();
  });

  describe('moment Date', () => {
    let component: ModelTypeComponent;
    let fixture: ComponentFixture<ModelTypeComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ModelTypeComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
      });
    });

    it('should be Date type', () => {
      const nowElement = fixture.debugElement.query(By.css('.dl-abdtp-now'));
      nowElement.nativeElement.click();

      expect(component.picker.value).toEqual(jasmine.any(moment));
    });
  });
});
