import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchExpenseList } from "../../../../slices/expences/main/list/thunk";
import {
  ExpenseListArg,
  IExpense,
  IExpensePaginate,
} from "../../../../types/expences/main/list";
import { ExpenseListStatus } from "../../../../enums/expense/summary/list";

export function useExpencesTable(params: ExpenseListArg = {}) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);

  const { data, status, error } = useSelector(
    (state: RootState) => state.expencesList
  );
  const [filter, setFilter] = useState<any>(null);

  const { enabled = false, ...otherParams } = params || {};

  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchExpenseList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch]);

  const loading = status === ExpenseListStatus.LOADING;
  const expensesData: IExpense[] = data || [];

  // Extract pagination data from the response
  const pagination: IExpensePaginate | null = data
    ? {
      current_page: 1,
      first_page_url: "",
      from: 1,
      last_page: 1,
      last_page_url: "",
      next_page_url: null,
      path: "",
      links: [],
      per_page: pageSize,
      prev_page_url: null,
      to: pageSize,
      total: data.length,
    }
    : null;

  const totalPages = pagination ? pagination.last_page : 1;
  const totalItems = pagination ? pagination.total : 0;

  return {
    expensesData,
    loading,
    error,

    page,
    pageSize,
    totalPages,
    totalItems,

    setPage,
    setPageSize,
    setFilter,
  };
}
