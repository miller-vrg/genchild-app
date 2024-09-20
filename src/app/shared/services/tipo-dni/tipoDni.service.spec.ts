/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoDniService } from './tipoDni.service';

describe('Service: TipoDni', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoDniService]
    });
  });

  it('should ...', inject([TipoDniService], (service: TipoDniService) => {
    expect(service).toBeTruthy();
  }));
});
