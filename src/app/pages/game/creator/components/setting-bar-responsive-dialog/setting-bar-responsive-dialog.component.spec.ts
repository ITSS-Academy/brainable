import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBarResponsiveDialogComponent } from './setting-bar-responsive-dialog.component';

describe('SettingBarResponsiveDialogComponent', () => {
  let component: SettingBarResponsiveDialogComponent;
  let fixture: ComponentFixture<SettingBarResponsiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingBarResponsiveDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBarResponsiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
