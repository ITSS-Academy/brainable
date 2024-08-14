import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerStatusBarComponent } from './answer-status-bar.component';

describe('AnswerStatusBarComponent', () => {
  let component: AnswerStatusBarComponent;
  let fixture: ComponentFixture<AnswerStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerStatusBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
