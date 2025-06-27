import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitySlotDocComponent } from './availability-slot-doc.component';

describe('AvailabilitySlotDocComponent', () => {
  let component: AvailabilitySlotDocComponent;
  let fixture: ComponentFixture<AvailabilitySlotDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilitySlotDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilitySlotDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
