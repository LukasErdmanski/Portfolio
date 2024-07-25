import { TestBed } from '@angular/core/testing';

import { HoverStyleService } from './hover-style.service';

describe('HoverStyleService', () => {
  let service: HoverStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoverStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
