import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateStudent } from "../../../slices/student/update/thunk";
import { UpdateStudentPayload } from "../../../types/student/update";

export function useUpdateStudent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentUpdate
  );

  const editStudent = useCallback(
    async (payload: UpdateStudentPayload) => {
      const resultAction = await dispatch(updateStudent(payload));
      if (updateStudent.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedStudent: data, status, error, editStudent };
}
