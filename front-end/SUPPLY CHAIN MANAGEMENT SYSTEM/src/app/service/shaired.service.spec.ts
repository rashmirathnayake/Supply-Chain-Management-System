import { TestBed } from '@angular/core/testing';

import { ShairedService } from './shaired.service';

describe('ShairedService', () => {
  let service: ShairedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShairedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
