/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VesselService } from './Vessel.service';

describe('Service: Vessel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VesselService]
    });
  });

  it('should ...', inject([VesselService], (service: VesselService) => {
    expect(service).toBeTruthy();
  }));
});
