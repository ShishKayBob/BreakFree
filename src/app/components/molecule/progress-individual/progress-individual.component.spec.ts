import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressIndividualComponent } from './progress-individual.component';

describe('ProgressIndividualComponent', () => {
  let component: ProgressIndividualComponent;
  let fixture: ComponentFixture<ProgressIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
