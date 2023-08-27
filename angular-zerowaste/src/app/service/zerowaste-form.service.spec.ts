import { TestBed } from '@angular/core/testing';

import { ZerowasteFormService } from './zerowaste-form.service';

describe('ZerowasteFormService', () => {
  let service: ZerowasteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZerowasteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
