import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockBusySlotsDocComponent } from './unblock-busy-slots-doc.component';

describe('UnblockBusySlotsDocComponent', () => {
  let component: UnblockBusySlotsDocComponent;
  let fixture: ComponentFixture<UnblockBusySlotsDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnblockBusySlotsDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnblockBusySlotsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
