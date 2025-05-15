import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionLinkComponent } from './call-to-action-link.component';

describe('CallToActionLinkComponent', () => {
  let component: CallToActionLinkComponent;
  let fixture: ComponentFixture<CallToActionLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallToActionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
