import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchGuidanceMeetings } from "../../../slices/guidanceMeeting/list/thunk";
import {
  GuidanceMeetList,
  meta,
  GuidanceMeetingsListArg,
} from "../../../types/guidanceMeeting/list";
import GuidanceMeetingsListStatus from "../../../enums/guidanceMeeting/list";

export function useGuidanceMeetingsTable(params: GuidanceMeetingsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const {
    data: listData,
    meta,
    status,
    error,
  } = useSelector((state: RootState) => state.guidanceMeetingList);

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled, ...restParams } = params;
    const query: GuidanceMeetingsListArg = {
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchGuidanceMeetings(query));
  }, [dispatch, filter, page, pageSize, params]);

  const loading = status === GuidanceMeetingsListStatus.LOADING;
  const guidanceMeetingsData: GuidanceMeetList[] = listData || [];
  const paginationMeta: meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    guidanceMeetingsData,
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
