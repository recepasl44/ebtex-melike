import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addStudentPsychological } from "../../../slices/studentPsychologicals/add/thunk";

export function useStudentPsychologicalAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentPsychologicalAdd
  );

  const addNewStudentPsychological = useCallback(
    async (payload: Parameters<typeof addStudentPsychological>[0]) => {
      const resultAction = await dispatch(addStudentPsychological(payload));
      if (addStudentPsychological.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedStudentPsychological: data,
    status,
    error,
    addNewStudentPsychological,
  };
}
