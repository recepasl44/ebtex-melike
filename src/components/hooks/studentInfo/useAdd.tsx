import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addStudentinfo } from "../../../slices/studentInfo/add/thunk";
import { StudentinfosAddPayload } from "../../../types/studentInfos/add";

export function useStudentinfoAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentInfoAdd
  );

  const addNewStudentinfo = useCallback(
    async (payload: StudentinfosAddPayload) => {
      const resultAction = await dispatch(addStudentinfo(payload));
      if (addStudentinfo.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedStudentinfo: data, status, error, addNewStudentinfo };
}
