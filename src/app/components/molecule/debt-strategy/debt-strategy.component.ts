import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { DebtService } from '../../../services/debt.service';
import Debt from '../../../types/debt';
import { AccordionModule } from 'primeng/accordion';

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
  @Input()
  public selectedStrategy: string = '';

  @Input()
  public repaymentOrder: number[] = [];

  @Input()
  public debts: Debt[] = [];

  public strategies: string[] = ['Snowball', 'Avalanche', 'Custom'];

  public editForm: boolean = false;

  constructor(
    private debtService: DebtService
  ) { }

  ngOnInit() { }

  ngOnDestroy() {}

  public onSubmit() {
    this.debtService.saveDebtStrategy(this.selectedStrategy, this.repaymentOrder);
    this.editForm = false;
  }


  public getDebtForOrder(index: number): Debt {
    return this.debts[index-1];
  }

}
