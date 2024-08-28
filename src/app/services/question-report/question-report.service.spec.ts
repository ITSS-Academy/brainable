import { TestBed } from '@angular/core/testing';

import { QuestionReportService } from './question-report.service';

describe('QuestionReportService', () => {
  let service: QuestionReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
