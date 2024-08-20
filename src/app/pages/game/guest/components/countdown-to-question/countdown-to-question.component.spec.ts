import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownToQuestionComponent } from './countdown-to-question.component';

describe('CountdownToQuestionComponent', () => {
  let component: CountdownToQuestionComponent;
  let fixture: ComponentFixture<CountdownToQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownToQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownToQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
