import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateComponent } from './dialog-create.component';

describe('DialogCreateComponent', () => {
  let component: DialogCreateComponent;
  let fixture: ComponentFixture<DialogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
