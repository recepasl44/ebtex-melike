import FinancialSummaryStatus from "../../../enums/accounting/financial_summary/status";

export interface BankBalance {
  bank_name: string;
  amount: number;
}

export interface FinancialSummaryData {
  liquid_assets: {
    cash: number;
    remaining_receivables: number;
    banks: BankBalance[];
  };
  liabilities: {
    personnel_payables: number;
    supplier_debts: number;
  };
}

export interface FinancialSummaryState {
  data: FinancialSummaryData | null;
  status: FinancialSummaryStatus;
  error: string | null;
}
