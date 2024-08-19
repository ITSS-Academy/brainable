import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNicknameComponent } from './enter-nickname.component';

describe('EnterNicknameComponent', () => {
  let component: EnterNicknameComponent;
  let fixture: ComponentFixture<EnterNicknameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterNicknameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
