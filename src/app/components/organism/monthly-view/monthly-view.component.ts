import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../../services/debt.service';
import Debt from '../../../types/debt';
import Payment from '../../../types/payment';
import { Subscription } from 'rxjs';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MonthSelectorComponent } from '../../molecule/month-selector/month-selector.component';
import { MonthBillsComponent } from '../../molecule/month-bills/month-bills.component';

@Component({
  selector: 'monthly-view',
  imports: [CommonModule, MonthSelectorComponent, MonthBillsComponent],
  templateUrl: './monthly-view.component.html',
  styleUrl: './monthly-view.component.scss',
  standalone: true
})
export class MonthlyViewComponent implements OnInit {
  public debts: Debt[] = [];
  private debtServiceSubscription!: Subscription;

  constructor(private debtService: DebtService) {}

  ngOnInit() {
    this.debtServiceSubscription = this.debtService.$debtService.subscribe((info) => {
      this.debts = info.debts;
    });
  }

  ngOnDestroy() {
    this.debtServiceSubscription.unsubscribe();
  }

  onMonthChange(event: any) {
    const month = event;
    // Handle month change if needed
    console.log('Selected month changed to:', month);
  }
}
