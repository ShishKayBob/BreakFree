import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DebtService } from '../../../services/debt.service';
import { BudgetService } from '../../../services/budget.service';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'debt-allocation',
  imports: [CardModule, InputTextModule, SliderModule, FormsModule, CommonModule],
  templateUrl: './debt-allocation.component.html',
  styleUrl: './debt-allocation.component.scss'
})
export class DebtAllocationComponent {

  @Input()
  public allocation: number = 0;

  public maxAllocation: number = 0;

  constructor(private debtService: DebtService, private budgetService: BudgetService) { }

  ngOnInit() {
    this.maxAllocation = this.getMaxAllocation();
  }

  public getMaxAllocation(): number {
    return parseFloat((this.budgetService.getTotalIncome() - this.budgetService.getTotalExpenses() - this.getMinAllocation()).toFixed(2));
  }

  public getMinAllocation(): number {
    return this.debtService.getTotalMimimums();
  }

}
