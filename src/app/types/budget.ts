import BudgetCategory from "./budgetCategory";

export default interface Budget {
    income: BudgetCategory[];
    expenses: BudgetCategory[];
    debtAllocation: number;

}