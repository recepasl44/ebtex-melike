import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchIncomes } from "../../../slices/Income/list/thunk";
import {
  IncomeData,
  IncomeMeta,
  IncomeListArgs,
} from "../../../types/income/list";
import { IncomeListStatus } from "../../../enums/income/list";

export function useIncomeTable(params: IncomeListArgs) {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);

  const [filter, setFilter] = useState<"daily" | "monthly" | "period">(
    params.filter || "period"
  );
  const [date, setDate] = useState<string>(params.date || "");
  const [month, setMonth] = useState<number>(
    params.month || new Date().getMonth() + 1
  );
  const [year, setYear] = useState<number>(
    params.year || new Date().getFullYear()
  );

  const [startDate, setStartDate] = useState<string>(
    params.startDate || "2021-04-06"
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate || "2025-04-06"
  );
  const [searchTerm, setSearchTerm] = useState<string>(params.searchTerm || "");

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.incomeList
  );

  useEffect(() => {
    const { enabled, ...restParams } = params ?? {};

    if (enabled === false) return;

    const query = {
      filter,
      per_page: pageSize,
      ...(filter === "daily" && { date }),
      ...(filter === "monthly" && { month, year }),
      ...(filter === "period" && { start_date: startDate, end_date: endDate }),
      ...restParams,
    };

    // API çağrısını dispatch ediyoruz

    dispatch(fetchIncomes(query));
  }, [
    dispatch,
    params,
    filter,
    pageSize,
    date,
    month,
    year,
    startDate,
    endDate,
  ]);

  const loading = status === IncomeListStatus.LOADING;
  const incomesData: IncomeData[] = data || [];
  const paginationMeta: IncomeMeta | null = meta;

  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    incomesData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    filter,
    setFilter,
    date,
    setDate,
    month,
    setMonth,
    year,
    setYear,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchTerm,
    setSearchTerm,
  };
}
