import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchBranchList } from "../../../slices/branch/list/thunk";
import {
  Branch,
  BranchListMeta,
  BranchListArg,
} from "../../../types/branch/list";
import { BranchListStatus } from "../../../enums/branch/list";



export function useBranchTable(params: BranchListArg) {
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.branchList
  );


  const [filter, setFilter] = useState<any>(null);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchBranchList({
        enabled: true,
        ...otherParams,
        filter,
      })
    );
  }, [enabled, filter, dispatch]);

  const loading = status === BranchListStatus.LOADING;
  const branchData: Branch[] = data || [];
  const paginationMeta: BranchListMeta | null = meta;

  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    data,
    branchData,
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
