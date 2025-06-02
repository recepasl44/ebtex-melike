import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchOpenAccountList } from "../../../slices/openAccount/list/thunk";
import {
  IOpenAccount,
  IOpenAccountPaginate,
  OpenAccountListArgs,
} from "../../../types/openAccount/list";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";

export function useOpenAccountTable(params: OpenAccountListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, status, error } = useSelector(
    (state: RootState) => state.openAccountList
  );
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchOpenAccountList({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch]);
  const loading = status === OpenAccountListStatus.LOADING;
  const openAccountData: IOpenAccount[] = data || [];

  // Extract pagination data from the response
  const pagination: IOpenAccountPaginate | null = data
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
    openAccountData,
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
