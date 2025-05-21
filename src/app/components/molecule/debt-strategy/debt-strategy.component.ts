import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule, TableRowReorderEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { DebtService } from '../../../services/debt.service';
import Debt from '../../../types/debt';
import { AccordionModule } from 'primeng/accordion';
import DebtInfo from '../../../types/debtInfo';
import Strategy from '../../../types/strategy';

@Component({
  selector: 'debt-strategy',
  imports: [CardModule,
    RadioButtonModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    AccordionModule],
  templateUrl: './debt-strategy.component.html',
  styleUrl: './debt-strategy.component.scss'
})
export class DebtStrategyComponent {
  public debtStrategy: Strategy = {selectedStrategy: '', repaymentOrder: []};

  public strategies: string[] = ['Snowball', 'Avalanche', 'Custom'];

  public debts: Debt[] = [];

  public editForm: boolean = false;

  private debtServiceSubscription!: Subscription;

  constructor(
    private debtService: DebtService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.debtServiceSubscription = this.debtService.$debtService
      .subscribe((value: DebtInfo) => {
        this.debts = value.debts;
        this.debtStrategy = value.strategy;
      });
  }

  ngOnDestroy() {
    this.debtServiceSubscription.unsubscribe();
  }

  public onRowReorder(event: TableRowReorderEvent) {
    const { dragIndex, dropIndex } = event;
    let arr = [...this.debtStrategy.repaymentOrder];

    if (dragIndex === undefined || dropIndex === undefined || dragIndex < 0 || dragIndex >= arr.length || dropIndex < 0 || dropIndex >= arr.length) {
      // Do nothing for now
    } else {
      const moved = arr.splice(dragIndex, 1)[0];
      arr.splice(dropIndex, 0, moved);

      this.debtStrategy.repaymentOrder = arr;
    }
  }

  public onSubmit() {
    this.debtService.saveDebtStrategy(this.debtStrategy);
    this.editForm = false;
  }

}
