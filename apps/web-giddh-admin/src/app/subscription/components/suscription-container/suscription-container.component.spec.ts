import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptionContainerComponent } from './suscription-container.component';

describe('SuscriptionContainerComponent', () => {
  let component: SuscriptionContainerComponent;
  let fixture: ComponentFixture<SuscriptionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuscriptionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
