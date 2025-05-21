import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDebtComponent } from './manage-debt.component';

describe('ManageDebtComponent', () => {
  let component: ManageDebtComponent;
  let fixture: ComponentFixture<ManageDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDebtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
