// src/hooks/student/useList.ts
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

  /***
   *  Tek kaynaktan veri doğruluğu için
   *  page / pageSize’i direkt paramdan yönetiyoruz.
   */
  const paginate = params.paginate ?? 10;
  const page = params.page ?? 1;

  /* --------- Redux state --------- */
  const {
    data: studentData,
    meta,
    status,
    error,
  } = useSelector((state: RootState) => state.studentList);

  const { enabled = true, ...otherParams } = params;

  /* --------- API çağrısı --------- */
  useEffect(() => {
    if (!enabled) return;

    dispatch(
      fetchStudents({
        ...otherParams,
        paginate,           // <- doğru değerler
        page,
        filter: params.filter ?? null,
      })
    );
  }, [
    enabled,
    dispatch,
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

  /* --------- Geri dönüş --------- */
  const loading = status === StudentListStatus.LOADING;
  const data: ListStudentResponse["data"] = studentData || [];
  const pagination: ListStudentResponse["meta"] | null = meta;

  return {
    data,
    loading,
    error,
    totalPages: pagination ? pagination.last_page : 1,
    totalItems: pagination ? pagination.total : 0,
  };
}
