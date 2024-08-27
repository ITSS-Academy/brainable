import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostLeftSnackbarComponent } from './host-left-snackbar.component';

describe('HostLeftSnackbarComponent', () => {
  let component: HostLeftSnackbarComponent;
  let fixture: ComponentFixture<HostLeftSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostLeftSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostLeftSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
