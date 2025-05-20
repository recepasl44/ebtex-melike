import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchGuidanceObservations } from "../../../slices/guidanceObservations/list/thunk";
import { GuidanceObservationsListArg } from "../../../types/guidanceObservations/list";
import { GuidanceObservationsListStatus } from "../../../enums/guidanceObservations/list";

export function useGuidanceObservationsList(
  params: GuidanceObservationsListArg
) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.guidanceObservationsList
  );
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled, ...restParams } = params;
    const query: GuidanceObservationsListArg = {
      ...restParams,
      page,
      pageSize,
      filter,
    };
    dispatch(fetchGuidanceObservations(query));
  }, [dispatch, filter, page, pageSize, params]);

  const loading = status === GuidanceObservationsListStatus.LOADING;
  const guidanceObservationsData = data || [];
  const paginationMeta = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    guidanceObservationsData,
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
