import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportNotificationComponent } from './dialog-import-notification.component';

describe('DialogImportNotificationComponent', () => {
  let component: DialogImportNotificationComponent;
  let fixture: ComponentFixture<DialogImportNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogImportNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogImportNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
