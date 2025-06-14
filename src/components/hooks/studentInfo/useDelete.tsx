import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteStudentinfo } from "../../../slices/studentInfo/delete/thunk";

export function useStudentinfoDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentInfoDelete
  );

  const deleteExistingStudentinfo = useCallback(
    async (studentinfoId: number) => {
      const resultAction = await dispatch(deleteStudentinfo(studentinfoId));
      if (deleteStudentinfo.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedStudentinfo: data, status, error, deleteExistingStudentinfo };
}
