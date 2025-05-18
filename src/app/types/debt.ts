import Payment from "./payment";

export default interface Debt {
    name: string,
    type: 'credit' | 'loan' | 'installment',
    initialBalance: number,
    currentBalance: number,
    interestRate: number,
    estMinPayment: number,
    paymentHistory: Payment[],
};