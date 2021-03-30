import { TestBed } from '@angular/core/testing';

import { BtcsService } from './btcs.service';

describe('BtcsService', () => {
  let service: BtcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
