import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchFinancialSummary } from "../../../../slices/accounting/financial_summary/thunk";
import FinancialSummaryStatus from "../../../../enums/accounting/financial_summary/status";
import { FinancialSummaryData } from "../../../../types/accounting/financial_summary";

export function useFinancialSummary() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.financialSummary
  );

  useEffect(() => {
    dispatch(fetchFinancialSummary());
  }, [dispatch]);

  const loading = status === FinancialSummaryStatus.LOADING;
  const summary: FinancialSummaryData | null = data;

  return { summary, loading, error };
}
