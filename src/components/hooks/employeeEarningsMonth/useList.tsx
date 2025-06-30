import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchEmployeeEarningsMonthList } from "../../../slices/employeeEarningsMonth/list/thunk";
import {
  EmployeeEarningsMonthData,
  EmployeeEarningsMonthListArgs
} from "../../../types/employeeEarningsMonth/list";
import EmployeeEarningsMonthListStatus from "../../../enums/employeeEarningsMonth/list";

export function useEmployeeEarningsMonthList(params: EmployeeEarningsMonthListArgs) {
  if (params?.enabled === false) {
    return {
      employeeEarningsMonthData: [] as EmployeeEarningsMonthData[],
      loading: false,
      error: null,
      page: 1,
      setPage: () => {},
      paginate: 10,
      setPaginate: () => {},
      filter: null,
      setFilter: () => {},
      totalPages: 1,
      totalItems: 0
    };
  }

  const { enabled = true, page: initialPage = 1, paginate: initialPaginate = 10, ...restParams } = params;

  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(initialPage);
  const [paginate, setPaginate] = useState<number>(initialPaginate);
  const [filter, setFilter] = useState<any>(null);

  const { data, status, error } = useSelector((state: RootState) => state.employeeEarningsMonthList);

  const serializedRestParams = useMemo(() => JSON.stringify(restParams), [restParams]);

  useEffect(() => {
    if (!enabled) return;

    const query: EmployeeEarningsMonthListArgs = {
      enabled,
      ...restParams,
      filter,
      page,
      paginate
    };

    dispatch(fetchEmployeeEarningsMonthList(query));
  }, [dispatch, enabled, serializedRestParams, filter, page, paginate]);

  const loading = status === EmployeeEarningsMonthListStatus.LOADING;
  const employeeEarningsMonthData: EmployeeEarningsMonthData[] = data || [];
  const totalPages = 1;
  const totalItems = employeeEarningsMonthData.length;

  return {
    employeeEarningsMonthData,
    loading,
    error,
    page,
    setPage,
    paginate,
    setPaginate,
    filter,
    setFilter,
    totalPages,
    totalItems
  };
}
