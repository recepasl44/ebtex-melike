import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchFinancialSummary } from "../../../../slices/accounting/financial_summary/thunk";
import FinancialSummaryStatus from "../../../../enums/accounting/financial_summary/status";
import { FinancialSummaryData } from "../../../../types/accounting/financial_summary";

interface UseFinancialSummaryArgs {
  season_id?: number;
  date?: string;
}

export function useFinancialSummary(args?: UseFinancialSummaryArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.financialSummary
  );

  useEffect(() => {
    dispatch(
      fetchFinancialSummary({
        season_id: args?.season_id,
        date: args?.date,
      })
    );
  }, [dispatch, args?.season_id, args?.date]);

  const loading = status === FinancialSummaryStatus.LOADING;
  const summary: FinancialSummaryData | null = data;

  return { summary, loading, error };
}
