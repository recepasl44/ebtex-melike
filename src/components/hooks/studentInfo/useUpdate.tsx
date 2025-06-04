import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateStudentinfo } from "../../../slices/studentInfo/update/thunk";
import { StudentinfosUpdatePayload } from "../../../types/studentInfos/update";

export function useStudentinfoUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentInfoUpdate
  );

  const updateExistingStudentinfo = useCallback(
    async (payload: StudentinfosUpdatePayload) => {
      const resultAction = await dispatch(updateStudentinfo(payload));
      if (updateStudentinfo.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedStudentinfo: data, status, error, updateExistingStudentinfo };
}
