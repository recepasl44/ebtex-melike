import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchScheduledAssignments } from "../../../slices/scheduledAssignments/list/thunk";
import {
  ScheduledAssignmentData,
  Meta,
  ScheduledAssignmentsListArg,
} from "../../../types/scheduledAssignments/list";
import { ScheduledAssignmentsListStatus } from "../../../enums/scheduledAssignments/list";

export function useScheduledAssignmentsTable(
  params: ScheduledAssignmentsListArg
) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.scheduledAssignmentList
  );

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled = true, ...restParams } = params;
    const query: ScheduledAssignmentsListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchScheduledAssignments(query));
  }, [dispatch, filter, page, pageSize, params]);

  const loading = status === ScheduledAssignmentsListStatus.LOADING;
  const scheduledAssignmentsData: ScheduledAssignmentData[] = data || [];
  const paginationMeta: Meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    scheduledAssignmentsData,
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
