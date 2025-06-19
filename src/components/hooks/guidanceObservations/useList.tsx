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
  const [paginate, setPaginate] = useState<number>(params.paginate || 10);
  const [filter, setFilter] = useState<any>(null);

  const { enabled = true, ...restParams } = params;

  useEffect(() => {
    const shouldFetch = enabled !== false;

    if (!shouldFetch) return;

    const query: GuidanceObservationsListArg = {
      ...restParams,
      filter,
      page,
      paginate,
    };
    dispatch(fetchGuidanceObservations(query));
  }, [
    dispatch,
    filter,
    page,
    paginate,
    enabled,
    restParams.status,
    restParams.student_id,
    restParams.start_date,
    restParams.end_date,
  ]);

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
    paginate,
    setPaginate,
    filter,
    setFilter,
    totalPages,
    totalItems,
  };
}
