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

  const [start_date, setStartDate] = useState<string>(params.start_date || "");
  const [end_date, setEndDate] = useState<string>(params.end_date || "");

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.incomeList
  );

  useEffect(() => {
    const { enabled, ...restParams } = params ?? {};

    const query = {
      filter,
      per_page: pageSize,
      start_date: start_date,
      end_date: end_date,
      ...restParams,
    };

    // API çağrısını dispatch ediyoruz

    dispatch(fetchIncomes(query));
  }, [dispatch, params, filter, pageSize, start_date, end_date]);

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
    start_date,
    setStartDate,
    end_date,
    setEndDate,
  };
}
