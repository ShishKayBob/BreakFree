import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule, TableRowReorderEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { DebtService } from '../../../services/debt.service';
import Debt from '../../../types/debt';
import { AccordionModule } from 'primeng/accordion';
import DebtInfo from '../../../types/debtInfo';

@Component({
  selector: 'debt-strategy',
  imports: [CardModule,
    RadioButtonModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    AccordionModule],
  templateUrl: './debt-strategy.component.html',
  styleUrl: './debt-strategy.component.scss'
})
export class DebtStrategyComponent {
  public debtStrategyForm!: FormGroup;

  public strategies: string[] = ['Snowball', 'Avalanche', 'Custom'];

  public debts: Debt[] = [];

  public editForm: boolean = false;

  private debtServiceSubscription!: Subscription;

  constructor(
    private debtService: DebtService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.debtStrategyForm = this.formBuilder.group({
      selectedStrategy: ['', Validators.required],
      repaymentOrder: [[...this.debts]],
    })

    this.debtServiceSubscription = this.debtService.$debtService
      .subscribe((value: DebtInfo) => {
        this.debts = [...value.debts];
        this.debtStrategyForm.patchValue(value.strategy);
        this.debtStrategyForm.updateValueAndValidity();
      });
  }

  ngOnDestroy() {
    this.debtServiceSubscription.unsubscribe();
  }

  public onRowReorder(event: TableRowReorderEvent) {
    const { dragIndex, dropIndex } = event;
    let arr = [...this.debtStrategyForm.value.repaymentOrder];

    if (dragIndex === undefined || dropIndex === undefined || dragIndex < 0 || dragIndex >= arr.length || dropIndex < 0 || dropIndex >= arr.length) {
      // Do nothing for now
    } else {
      const moved = arr.splice(dragIndex, 1)[0];
      arr.splice(dropIndex, 0, moved);

      this.debtStrategyForm.patchValue({ repaymentOrder: arr })
      this.debtStrategyForm.updateValueAndValidity();
    }
  }

  public onSubmit() {
    console.log(this.debtStrategyForm.value.repaymentOrder)
    this.debtService.saveDebtStrategy(this.debtStrategyForm.value);
    this.editForm = false;
  }

}
