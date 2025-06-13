import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchPeriods } from "../../../slices/periods/list/thunk";
import { PeriodsListArg, PeriodData, Meta } from "../../../types/periods/list";
import { PeriodsListStatus } from "../../../enums/periods/list";

export function usePeriodsTable(params: PeriodsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [paginate, setPaginate] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.periodsList
  );

  const enabled = params?.enabled !== false;
  useEffect(() => {
    if (!enabled) return;

    const { enabled: _e, ...restParams } = params;
    const query: PeriodsListArg = {
      ...restParams,
      filter,
      page,
      paginate,
      per_page: paginate,
    };
    dispatch(fetchPeriods(query));
  }, [enabled, dispatch, filter, page, paginate]);

  const loading = status === PeriodsListStatus.LOADING;
  const periodsData: PeriodData[] = data || [];
  const paginationMeta: Meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    periodsData,
    loading,
    error,
    status,
    page,
    setPage,
    paginate,
    setPaginate,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
