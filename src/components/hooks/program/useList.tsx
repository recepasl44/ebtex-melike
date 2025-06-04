import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchPrograms } from "../../../slices/programs/list/thunk";
import {
  ListProgramResponse,
  ProgramListArg,
} from "../../../types/programs/list";
import { ProgramListStatus } from "../../../enums/programs/list";

export function useProgramsTable(params: ProgramListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<any>(null);
  const [page, setPage] = useState<number>(
    typeof params.page === "number" ? params.page : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    typeof params.pageSize === "number" ? params.pageSize : 10
  );
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.programList
  );
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchPrograms({
        enabled: false,
        ...otherParams,
        filter,
        page,
        pageSize,
        per_page: pageSize,
      })
    );
  }, [
    enabled,
    filter,
    dispatch,
    otherParams.name,
    otherParams.category_id,
    otherParams.pageSize,
    otherParams.page,
    otherParams.program_id,
    otherParams.level_id,
  ]);

  const loading = status === ProgramListStatus.LOADING;
  const programsData: ListProgramResponse["data"] = data || [];
  const paginationMeta: ListProgramResponse["meta"] | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    programsData,
    loading,
    error,
    totalPages,
    totalItems,
    setFilter,
    page,
    setPage,
    pageSize,
    setPageSize,
  };
}
