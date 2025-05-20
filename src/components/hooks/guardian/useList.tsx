import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchGuardians } from "../../../slices/guardian/list/thunk";
import {
  GuardianData,
  GuardianMeta,
  GuardianListArg,
} from "../../../types/guardian/list";
import { GuardiansListStatus } from "../../../enums/guardian/list";

export function useGuardiansTable(params: GuardianListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.guardianList
  );

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled = true, ...restParams } = params;
    if (!enabled) return;
    const query: GuardianListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchGuardians(query));
  }, [dispatch, filter, page, pageSize, params]);

  const loading = status === GuardiansListStatus.LOADING;
  const guardiansData: GuardianData[] = data || [];
  const paginationMeta: GuardianMeta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    guardiansData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
