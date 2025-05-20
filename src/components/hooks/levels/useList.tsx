import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchLevels } from "../../../slices/levels/list/thunk";
import { ListLevelResponse, LevelListArg } from "../../../types/levels/list";
import { LevelListStatus } from "../../../enums/levels/list";

export function useLevelsTable(params: LevelListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.levelList
  );

  const [filter, setFilter] = useState<any>(null);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchLevels({
        enabled,
        ...otherParams,
        filter,
      })
    );
  }, [enabled, filter, dispatch, otherParams.program_id, page, pageSize]);

  const loading = status === LevelListStatus.LOADING;
  const levelsData: ListLevelResponse["data"] = data || [];
  const paginationMeta: ListLevelResponse["meta"] | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    levelsData,
    loading,
    error,
    totalPages,
    totalItems,
    setFilter,
    setPageSize,
    page,
    setPage,
    pageSize,
  };
}
