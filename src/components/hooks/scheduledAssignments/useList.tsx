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
  const [paginate, setPaginate] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.scheduledAssignmentList
  );

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchScheduledAssignments({
        enabled: true,
        paginate,
        page,
        ...otherParams,
        filter,
      })
    );
  }, [
    enabled,
    filter,
    dispatch,
    page,
    paginate,
    otherParams.student_id,
    otherParams.unit_id,
    otherParams.start_date,
    otherParams.end_date,
    otherParams.status,
    otherParams.period_id,
    otherParams.level_id,
    otherParams.program_id,
  ]);

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
    paginate,
    setPaginate,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
