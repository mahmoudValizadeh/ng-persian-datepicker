import { TestBed } from '@angular/core/testing';

import { PersianDatepickerService } from './persian-datepicker.service';

describe('PersianDatepickerService', () => {
  let service: PersianDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersianDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
