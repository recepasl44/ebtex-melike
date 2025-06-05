import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchExpenseSummary } from "../../../../slices/expences/summary/thunk";
import { ExpenseSummary } from "../../../../types/expences/summary/getExpenseSummary";
import { ExpenseListStatus } from "../../../../enums/expense/summary/list";

export function useExpenseSummaryTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.expencesSummary
  );

  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    dispatch(fetchExpenseSummary(dateRange));
  }, [dispatch, dateRange]);

  const handleDateRangeChange = useCallback((selectedDates: Date[]) => {
    if (selectedDates.length === 2) {
      const startDate = selectedDates[0]?.toISOString().split("T")[0] || "";
      const endDate = selectedDates[1]?.toISOString().split("T")[0] || "";

      setDateRange({
        start_date: startDate,
        end_date: endDate,
      });
    }
  }, []);

  const loading = status === ExpenseListStatus.LOADING;
  const expenseData: ExpenseSummary | null = data;

  return {
    expenseData,
    loading,
    error,
    handleDateRangeChange,
  };
}
