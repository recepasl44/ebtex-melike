import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteStudentPsychological } from "../../../slices/studentPsychologicals/delete/thunk";

export function useStudentPsychologicalDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentPsychologicalDelete
  );

  const deleteExistingStudentPsychological = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(deleteStudentPsychological(id));
      if (deleteStudentPsychological.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedStudentPsychological: data,
    status,
    error,
    deleteExistingStudentPsychological,
  };
}
