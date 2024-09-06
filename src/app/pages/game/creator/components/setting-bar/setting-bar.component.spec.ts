import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBarComponent } from './setting-bar.component';

describe('SettingBarComponent', () => {
  let component: SettingBarComponent;
  let fixture: ComponentFixture<SettingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
