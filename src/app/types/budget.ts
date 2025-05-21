import BudgetCategory from "./budgetCategory";

export default interface Budget {
    takeHome: number;
    categories: BudgetCategory[];

}