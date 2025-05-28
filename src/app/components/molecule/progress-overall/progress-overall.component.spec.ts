import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressOverallComponent } from './progress-overall.component';

describe('ProgressOverallComponent', () => {
  let component: ProgressOverallComponent;
  let fixture: ComponentFixture<ProgressOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressOverallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
