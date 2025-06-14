import { useState, useEffect, useCallback } from "react";
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

  // Veri yenileme fonksiyonunu useCallback ile tanımlayın
  const refetch = useCallback(() => {
    const shouldFetch = params.enabled !== false;
    if (!shouldFetch) return;

    const { enabled = true, ...restParams } = params;
    const query: GuardianListArg = {
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };

    return dispatch(fetchGuardians(query));
  }, [dispatch, filter, page, pageSize, params]);

  // İlk yükleme ve bağımlılıklar değiştiğinde veriyi çek
  useEffect(() => {
    refetch();
  }, [dispatch, filter, page, pageSize, params.enabled]);

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
    refetch, // refetch fonksiyonunu döndürün
  };
}
