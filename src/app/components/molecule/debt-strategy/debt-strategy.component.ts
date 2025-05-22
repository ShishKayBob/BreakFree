import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { cloneArray } from '../../../utils/arrayUtils';

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

  public editForm: boolean = false;

  public debts: Debt[] = [];

  private debtServiceSubscription!: Subscription;

  constructor(
    private debtService: DebtService
  ) { }

  ngOnInit() {
    this.debtServiceSubscription = this.debtService.$debtService
      .subscribe((value: DebtInfo) => {
        this.debtStrategy = value.strategy;
        if (!this.debtStrategy.repaymentOrder.length) {
          this.debtStrategy.repaymentOrder = cloneArray(value.debts);
        }
        this.debts = cloneArray(this.debtStrategy.repaymentOrder);
      });
  }

  ngOnDestroy() {
    this.debtServiceSubscription.unsubscribe();
  }

  public onRowReorder(event: TableRowReorderEvent) {
    const { dragIndex, dropIndex } = event;
    if (dragIndex === undefined || dropIndex === undefined || dragIndex < 0 || dragIndex >= this.debtStrategy.repaymentOrder.length || dropIndex < 0 || dropIndex >= this.debtStrategy.repaymentOrder.length) {
      // Do nothing for now
    } else {
      const moved = this.debtStrategy.repaymentOrder.splice(dragIndex, 1)[0];
      this.debtStrategy.repaymentOrder.splice(dropIndex, 0, moved);
    }
  }

  public onSubmit() {
    this.debtService.saveDebtStrategy(this.debtStrategy);
    this.editForm = false;
  }

}
