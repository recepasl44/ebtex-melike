import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchStudentPsychological } from "../../../slices/studentPsychologicals/detail/thunk";

export function useStudentPsychologicalDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentPsychologicalDetail
  );

  const getStudentPsychological = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(fetchStudentPsychological(id));
      if (fetchStudentPsychological.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    studentPsychological: data,
    status,
    error,
    getStudentPsychological,
  };
}
