import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateStudentPsychological } from "../../../slices/studentPsychologicals/update/thunk";

export function useStudentPsychologicalUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentPsychologicalUpdate
  );

  const updateExistingStudentPsychological = useCallback(
    async (payload: Parameters<typeof updateStudentPsychological>[0]) => {
      const resultAction = await dispatch(updateStudentPsychological(payload));
      if (updateStudentPsychological.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedStudentPsychological: data,
    status,
    error,
    updateExistingStudentPsychological,
  };
}
