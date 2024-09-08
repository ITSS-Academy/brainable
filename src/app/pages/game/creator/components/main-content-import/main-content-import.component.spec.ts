import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentImportComponent } from './main-content-import.component';

describe('MainContentImportComponent', () => {
  let component: MainContentImportComponent;
  let fixture: ComponentFixture<MainContentImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContentImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
