import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocViewMyappointmentComponent } from './doc-view-myappointment.component';

describe('DocViewMyappointmentComponent', () => {
  let component: DocViewMyappointmentComponent;
  let fixture: ComponentFixture<DocViewMyappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocViewMyappointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocViewMyappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
