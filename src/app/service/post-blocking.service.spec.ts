import { TestBed } from '@angular/core/testing';

import { PostBlockingService } from './post-blocking.service';

describe('PostBlockingService', () => {
  let service: PostBlockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostBlockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
