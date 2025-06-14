import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { showStudent } from "../../../slices/student/show/thunk";

export function useShowStudent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentShow
  );

  const fetchStudent = useCallback(
    async (studentId: number) => {
      const resultAction = await dispatch(showStudent(studentId));
      if (showStudent.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { student: data, status, error, fetchStudent };
}
