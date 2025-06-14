import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchStudentPsychologicals } from "../../../slices/studentPsychologicals/list/thunk";
import {
  StudentPsychologicalListArg,
  StudentPsychologicalData,
  Meta,
} from "../../../types/studentPsychologicals/list";
import StudentPsychologicalsListStatus from "../../../enums/studentPsychologicals/list";

export function useStudentPsychologicalsList(
  params: StudentPsychologicalListArg
) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.studentPyschologicalList
  );

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled, ...restParams } = params;
    const query: StudentPsychologicalListArg = {
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchStudentPsychologicals(query));
  }, [dispatch, params, filter, page, pageSize]);

  const loading = status === StudentPsychologicalsListStatus.LOADING;
  const psychologicalsData: StudentPsychologicalData[] = data || [];
  const paginationMeta: Meta | null = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    psychologicalsData,
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
