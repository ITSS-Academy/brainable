import { TestBed } from '@angular/core/testing';

import { QuestionRecordService } from './question-record.service';

describe('QuestionRecordService', () => {
  let service: QuestionRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
