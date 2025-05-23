import { Injectable } from '@angular/core';
import Debt from '../types/debt';
import { PaymentResult } from '../types/paymentResult';
import { cloneArray } from '../utils/arrayUtils';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  constructor() { }

  public predictDebtPayoff(
  debts: Debt[],
  monthlyBudget: number,
  strategy: string
): PaymentResult {
  let months = 0;
  let totalInterest = 0;
  let debtsCopy = cloneArray(debts);
  const history: { [month: number]: Debt[] } = {};

  while (debtsCopy.some(d => d.currentBalance > 0)) {
    // Sort debts based on strategy
    const sorted = debtsCopy
      .filter(d => d.currentBalance > 0)
      .sort((a, b) => {
        if (strategy === 'Avalanche') return b.interestRate - a.interestRate;
        if (strategy === 'Snowball') return a.currentBalance - b.currentBalance;
        return 0;
      });

    // Apply interest and accumulate
    for (const debt of sorted) {
      if (debt.currentBalance <= 0) continue;
      const monthlyRate = debt.interestRate / 12 / 100;
      const interest = debt.currentBalance * monthlyRate;
      debt.currentBalance += interest;
      totalInterest += interest;
    }

    // Apply payments
    let remaining = monthlyBudget;

    // Pay minimums first
    for (const debt of debtsCopy) {
      if (debt.currentBalance <= 0) continue;
      const payment = Math.min(debt.estMinPayment, debt.currentBalance);
      debt.currentBalance -= payment;
      remaining -= payment;
    }

    // Pay extra toward the target debt
    for (const debt of sorted) {
      if (debt.currentBalance <= 0 || remaining <= 0) continue;
      const extraPayment = Math.min(debt.currentBalance, remaining);
      debt.currentBalance -= extraPayment;
      remaining -= extraPayment;
    }

    // Save history (shallow copy)
    history[months + 1] = cloneArray(debtsCopy);
    months++;
  }

  return {
    months,
    totalInterestPaid: parseFloat(totalInterest.toFixed(2)),
    debtHistory: history
  };
}
}
