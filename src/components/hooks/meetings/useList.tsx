import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchMeetings } from "../../../slices/meetings/list/thunk";
import {
  Meeting,
  MeetingListMeta,
  MeetingListArg,
} from "../../../types/meetings/list";
import { MeetingListStatus } from "../../../enums/meetings/list";

export function useMeetingsList(params: MeetingListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.meetingList
  );

  const { enabled = true, ...otherParams } = params;

  useEffect(() => {
    if (enabled === false) return;

    dispatch(
      fetchMeetings({
        page,
        pageSize,
        ...otherParams,
        filter,
      })
    );
  }, [
    dispatch,
    enabled,
    filter,
    page,
    pageSize,
    // Include all otherParams properties as dependencies
    ...Object.values(otherParams || {}),
  ]);

  const loading = status === MeetingListStatus.LOADING;
  const meetingsData: Meeting[] = data || [];

  // Extract pagination data from the response
  const paginationMeta: MeetingListMeta | null = meta || null;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    meetingsData,
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
