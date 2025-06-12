import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchBudgetEstimate } from "../../../../slices/accounting/budget_estimate/list/thunk";
import { BudgetItem, BudgetSummary, BudgetEstimateArgs } from "../../../../types/accounting/budget_estimate/list";
import BudgetEstimateStatus from "../../../../enums/accounting/budget_estimate/list";

export function useBudgetEstimate(params: BudgetEstimateArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, summary, status, error } = useSelector(
    (state: RootState) => state.budgetEstimateList
  );

  const { enabled = true, ...otherParams } = params;

  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchBudgetEstimate(otherParams));
  }, [enabled, dispatch, otherParams]);

  const items: BudgetItem[] = data || [];
  const info: BudgetSummary | null = summary;
  const loading = status === BudgetEstimateStatus.LOADING;

  return { items, info, loading, error };
}
