import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import {
  fetchStudents,
  FetchStudentsArgs,
} from "../../../slices/student/list/thunk";
import {
  ListStudentResponse,
  StudentListStatus,
} from "../../../types/student/list";

export function useListStudents(params: FetchStudentsArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<any>(null);
  const [paginate, setPaginate] = useState<number>(params.paginate || 10);
  const [page, setPage] = useState<number>(params.page || 1);

  // Params değiştiğinde sayfa ve pageSize değerlerini güncelle
  useEffect(() => {
    if (params.paginate !== undefined && params.paginate !== paginate) {
      setPaginate(params.page);
    }
    if (params.page !== undefined && params.page !== page) {
      setPage(params.page);
    }
  }, [params.paginate, params.page]);

  const {
    data: studentData,
    meta,
    status,
    error,
  } = useSelector((state: RootState) => state.studentList);
  const { enabled = true, ...otherParams } = params;

  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchStudents({
        ...otherParams,
        paginate,
        page,
        filter,
      })
    );
  }, [
    enabled,
    dispatch,
    filter,
    paginate,
    page,
    otherParams.first_name,
    otherParams.program_id,
    otherParams.branch_id,
    otherParams.level_id,
    otherParams.student_id,
    otherParams.startDate,
    otherParams.endDate,
  ]);

  const loading = status === StudentListStatus.LOADING;
  const data: ListStudentResponse["data"] = studentData || [];
  const paginationMeta: ListStudentResponse["meta"] | null = meta;
  return {
    data,
    loading,
    setFilter,
    setPaginate,
    setPage,
    paginate,
    page,
    filter,
    error,
    totalPages: paginationMeta ? paginationMeta.last_page : 1,
    totalItems: paginationMeta ? paginationMeta.total : 0,
  };
}
