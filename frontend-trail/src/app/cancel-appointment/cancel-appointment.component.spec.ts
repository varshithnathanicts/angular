import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAppointmentComponent } from './cancel-appointment.component';

describe('CancelAppointmentComponent', () => {
  let component: CancelAppointmentComponent;
  let fixture: ComponentFixture<CancelAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
