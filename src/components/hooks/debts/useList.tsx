import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchDebts } from "../../../slices/suppliers/debt/list/thunk";
import { DebtData, DebtMeta } from "../../../types/suppliers/debt/list";
import { DebtListStatus } from "../../../enums/debts/list";

export function useDebtsTable() {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.debtList
  );

  useEffect(() => {
    dispatch(
      fetchDebts({
        searchTerm,
        page,
        paginate: pageSize,
      })
    );
  }, [dispatch, searchTerm, page, pageSize]);

  const loading = status === DebtListStatus.LOADING;
  const debtsData: DebtData[] = data || [];
  const paginationMeta: DebtMeta | null = meta;

  const totalPages =
    paginationMeta && typeof paginationMeta.last_page === 'number'
      ? paginationMeta.last_page
      : 1;
  const totalItems =
    paginationMeta && typeof paginationMeta.total === 'number'
      ? paginationMeta.total
      : debtsData.length;

  return {
    debtsData,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    searchTerm,
    setSearchTerm,
  };
}
