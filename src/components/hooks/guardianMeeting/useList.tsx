import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchGuardianMeetings } from "../../../slices/guardianMeeting/list/thunk";
import {
  GuardianMeetingData,
  GuardianMeetingMeta,
  GuardianMeetingListArg,
} from "../../../types/guardianMeeting/list";
import { GuardianMeetingListStatus } from "../../../enums/guardianMeeting/list";

export function useGuardianMeetingList(params: GuardianMeetingListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [paginate, setPaginate] = useState<number>(params.paginate || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.guardianMeetingList
  );

  useEffect(() => {
    const shouldFetch = params.enabled !== false;

    if (!shouldFetch) return;

    const { enabled = true, ...restParams } = params;
    const query: GuardianMeetingListArg = {
      ...restParams,
      filter,
      page,
      paginate,
    };
    dispatch(fetchGuardianMeetings(query));
  }, [
    dispatch,
    filter,
    page,
    paginate,
    params.enabled,
    params.start_date,
    params.end_date,
    params.student_id,
  ]);

  const loading = status === GuardianMeetingListStatus.LOADING;
  const guardianMeetingsData: GuardianMeetingData[] = data || [];
  const paginationMeta: GuardianMeetingMeta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    guardianMeetingsData,
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
