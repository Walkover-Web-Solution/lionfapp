import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceKeyComponent } from './licence-key.component';

describe('LicenceKeyComponent', () => {
  let component: LicenceKeyComponent;
  let fixture: ComponentFixture<LicenceKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
