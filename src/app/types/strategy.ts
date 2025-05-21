import Debt from "./debt";

export default interface Strategy {
    selectedStrategy: '' | 'Custom' | 'Avalanche' | 'Snowball',
    repaymentOrder: Debt[],
}