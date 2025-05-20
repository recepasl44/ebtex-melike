import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchStudentinfos } from "../../../slices/studentInfo/list/thunk";
import {
  Studentinfo,
  StudentinfosListArg,
  Meta,
} from "../../../types/studentInfos/list";
import StudentinfosListStatus from "../../../enums/studentInfos/list";

export function useStudentinfosTable(params: StudentinfosListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);
  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.studentInfoList
  );

  useEffect(() => {
    if (params?.enabled === false) return;
    const { enabled = true, ...restParams } = params;
    if (!enabled) return;
    const query: StudentinfosListArg = {
      enabled,
      ...restParams,
      filter,
      page,
      pageSize,
      per_page: pageSize,
    };
    dispatch(fetchStudentinfos(query));
  }, [dispatch, filter, page, pageSize, params]);

  const loading = status === StudentinfosListStatus.LOADING;
  const studentinfosData: Studentinfo[] = data || [];
  const paginationMeta: Meta | null = meta || null;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    studentinfosData,
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
