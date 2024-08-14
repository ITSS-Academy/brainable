import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHeadComponent } from './question-head.component';

describe('QuestionHeadComponent', () => {
  let component: QuestionHeadComponent;
  let fixture: ComponentFixture<QuestionHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
