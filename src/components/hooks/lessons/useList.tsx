import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchLessons } from "../../../slices/lessons/list/thunk";
import { LessonsListStatus } from "../../../enums/lessons/list";
import { LessonsListArg } from "../../../types/lessons/list";

export function useLessonList(params: LessonsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, status, error, meta } = useSelector(
    (state: RootState) => state.lessonList
  );

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchLessons({
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
    otherParams.pageSize,
    otherParams.page,
  ]);

  const loading = status === LessonsListStatus.LOADING;
  const lessonsData = data || [];
  const totalPages = meta ? meta.last_page : 1;
  const totalItems = meta ? meta.total : 0;

  return {
    lessonsData,
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
