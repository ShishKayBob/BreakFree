import Debt from "./debt";

export interface PaymentResult {
  months: number;
  totalInterestPaid: number;
  debtHistory: { [month: number]: Debt[] };
}