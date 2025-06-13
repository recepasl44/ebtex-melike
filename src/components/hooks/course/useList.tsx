import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchCourses } from "../../../slices/courses/list/thunk";
import { data, meta, CourseListArg } from "../../../types/courses/list";
import { CoursesListStatus } from "../../../enums/courses/list";

export function useCoursesTable(params: CourseListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params?.page || 1);
  const [pageSize, setPageSize] = useState<number>(params?.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  // use the redux slice
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.courseList
  );
  const { enabled, ...restParams } = params;
  useEffect(() => {
    if (!enabled) return;

    const query: CourseListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };

    dispatch(fetchCourses(query));
  }, [
    dispatch,
    filter,
    page,
    pageSize,
    enabled,
    restParams.name,
    restParams.level_id,
    restParams.branch_id,

  ]);

  const loading = status === CoursesListStatus.LOADING;
  const coursesData: data[] = data || [];
  const paginationMeta: meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    coursesData,
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
