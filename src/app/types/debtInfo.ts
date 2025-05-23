import Debt from "./debt";

export default interface DebtInfo {
    strategy: string,
    repaymentOrder: number[],
    debts: Debt[],
}