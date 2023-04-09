import { TestBed } from '@angular/core/testing';

import { PostReactiveService } from './post-reactive.service';

describe('PostReactiveService', () => {
  let service: PostReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
