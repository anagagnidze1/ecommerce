import { TestBed } from '@angular/core/testing';

import { furnitureService } from './furniture.service';

describe('userFurniture', () => {
  let service: furnitureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(furnitureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
