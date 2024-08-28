import { TestBed } from '@angular/core/testing';

import { PlayerRecordService } from './player-record.service';

describe('PlayerRecordService', () => {
  let service: PlayerRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
