import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchUnits } from "../../../slices/units/list/thunk";
import { data, meta, UnitListArg } from "../../../types/units/list";
import { UnitsListStatus } from "../../../enums/units/list";

export function useUnitsTable(params: UnitListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filter, setFilter] = useState<any>(null);
  
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.unitsList
  );

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchUnits({
        ...otherParams,
        filter,
        enabled: false,
      })
    );
  }, [enabled, filter, dispatch,otherParams.lesson_id]);

  const loading = status === UnitsListStatus.LOADING;
  const unitsData: data[] = data || [];
  const paginationMeta: meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    unitsData,
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
