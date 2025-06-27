import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusySlotsDocComponent } from './busy-slots-doc.component';

describe('BusySlotsDocComponent', () => {
  let component: BusySlotsDocComponent;
  let fixture: ComponentFixture<BusySlotsDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusySlotsDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusySlotsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
