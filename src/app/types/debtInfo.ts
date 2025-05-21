import Debt from "./debt";
import Strategy from "./strategy";

export default interface DebtInfo {
    strategy: Strategy,
    debts: Debt[],
}