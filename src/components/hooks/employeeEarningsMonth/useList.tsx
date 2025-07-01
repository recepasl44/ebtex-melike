import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchEmployeeEarningsMonthList } from "../../../slices/employeeEarningsMonth/list/thunk";
import {
  EmployeeEarningsMonthData,
  EmployeeEarningsMonthListArgs,
  PaginationMeta,
} from "../../../types/employeeEarningsMonth/list";
import EmployeeEarningsMonthListStatus from "../../../enums/employeeEarningsMonth/list";

/* ------------------------------------------------------------------
 |  JSON.stringify → ama anahtarları alfabetik sıraya sokarak
 |------------------------------------------------------------------*/
function stableStringify(obj: unknown): string {
  return JSON.stringify(obj, (_k, v) => {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return Object.keys(v)
        .sort()
        .reduce((acc: Record<string, unknown>, key) => {
          acc[key] = (v as Record<string, unknown>)[key];
          return acc;
        }, {});
    }
    return v;
  });
}

/* ------------------------------------------------------------------
 |  HOOK
 |------------------------------------------------------------------*/
export function useEmployeeEarningsMonthList(
  params: EmployeeEarningsMonthListArgs
) {
  /* -------------------------------------------------------------- */
  /* disabled ise "boş" state döndür                                 */
  /* -------------------------------------------------------------- */
  if (params?.enabled === false) {
    return {
      employeeEarningsMonthData: [] as EmployeeEarningsMonthData[],
      loading: false,
      error: null,
      page: 1,
      setPage: () => { },
      paginate: 10,
      setPaginate: () => { },
      filter: null,
      setFilter: () => { },
      totalPages: 1,
      totalItems: 0,
    };
  }

  /* -------------------------------------------------------------- */
  /* parametreler                                                    */
  /* -------------------------------------------------------------- */
  const {
    enabled = true,
    page: initialPage = 1,
    paginate: initialPaginate = 10,
    ...restParams
  } = params;

  /* -------------------------------------------------------------- */
  /* local state + redux                                             */
  /* -------------------------------------------------------------- */
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState<number>(initialPage);
  const [paginate, setPaginate] = useState<number>(initialPaginate);
  const [filter, setFilter] = useState<any>(null);

  const { data, status, error, meta } = useSelector(
    (state: RootState) => state.employeeEarningsMonthList
  );

  /* -------------------------------------------------------------- */
  /* deterministik dependecy string                                  */
  /* -------------------------------------------------------------- */
  const serializedRestParams = useMemo(
    () => stableStringify(restParams),
    [restParams]
  );

  /* -------------------------------------------------------------- */
  /* api çağrısı                                                     */
  /* -------------------------------------------------------------- */
  useEffect(() => {
    if (!enabled) return;

    const query: EmployeeEarningsMonthListArgs = {
      enabled,
      ...restParams,
      filter,
      page,
      paginate,
    };

    dispatch(fetchEmployeeEarningsMonthList(query));
  }, [dispatch, enabled, serializedRestParams, filter, page, paginate]);

  /* -------------------------------------------------------------- */
  /* geriye dönen değerler                                           */
  /* -------------------------------------------------------------- */
  const loading = status === EmployeeEarningsMonthListStatus.LOADING;
  const employeeEarningsMonthData: EmployeeEarningsMonthData[] = data || [];
  const paginationMeta: PaginationMeta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  /* set* fonksiyonları useCallback ile sarmalanabilir (opsiyonel) */
  const memoSetPage = useCallback(setPage, []);
  const memoSetPaginate = useCallback(setPaginate, []);
  const memoSetFilter = useCallback(setFilter, []);

  return {
    employeeEarningsMonthData,
    loading,
    error,
    page,
    setPage: memoSetPage,
    paginate,
    setPaginate: memoSetPaginate,
    filter,
    setFilter: memoSetFilter,
    totalPages,
    totalItems,
  };
}
