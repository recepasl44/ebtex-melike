import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchBankList } from "../../../slices/bank/list/thunk";
import { BankListArgs, IBank, IBankPaginate } from "../../../types/bank/list";
import { BankListStatus } from "../../../enums/bank/list";

export function useBankTable(params: BankListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, status, error } = useSelector(
    (state: RootState) => state.bankList
  );

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchBankList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch]);
  const loading = status === BankListStatus.LOADING;
  const bankData: IBank[] = data || [];

  // Extract pagination data from the response
  const pagination: IBankPaginate | null = data
    ? {
        current_page: 1,
        first_page_url: "",
        from: 1,
        last_page: 1,
        last_page_url: "",
        next_page_url: null,
        path: "",
        per_page: pageSize,
        prev_page_url: null,
        to: pageSize,
        total: data.length,
      }
    : null;

  const totalPages = pagination ? pagination.last_page : 1;
  const totalItems = pagination ? pagination.total : 0;

  return {
    bankData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalItems,
    setFilter,
  };
}
