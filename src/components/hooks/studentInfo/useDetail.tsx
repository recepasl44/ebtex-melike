import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchStudentinfo } from "../../../slices/studentInfo/detail/thunk";

export function useStudentinfoDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentInfoDetail
  );

  const getStudentinfo = useCallback(
    async (studentinfoId: number) => {
      const resultAction = await dispatch(fetchStudentinfo(studentinfoId));
      if (fetchStudentinfo.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { studentinfo: data, status, error, getStudentinfo };
}
