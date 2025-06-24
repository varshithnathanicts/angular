import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitySlotsComponent } from './availability-slots.component';

describe('AvailabilitySlotsComponent', () => {
  let component: AvailabilitySlotsComponent;
  let fixture: ComponentFixture<AvailabilitySlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilitySlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilitySlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
