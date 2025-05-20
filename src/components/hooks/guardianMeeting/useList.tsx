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
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.guardianMeetingList
  );

  useEffect(() => {
    if (params?.enabled === false) return;

    const { enabled = true, ...restParams } = params;
    const query: GuardianMeetingListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchGuardianMeetings(query));
  }, [dispatch, filter, page, pageSize, params]);

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
    pageSize,
    setPageSize,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
