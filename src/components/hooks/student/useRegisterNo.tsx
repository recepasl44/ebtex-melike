import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchRegisterNo } from "../../../slices/student/registerNo/thunk";
import { RegisterNoResponse } from "../../../types/student/registerNo";

export function useRegisterNo() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentRegisterNo
  );
  const getRegisterNo = useCallback(
    async (schoolId: number, branchId: number) => {
      const resultAction = await dispatch(
        fetchRegisterNo({ school_id: schoolId, branche_id: branchId })
      );
      if (fetchRegisterNo.fulfilled.match(resultAction)) {
        return resultAction.payload as RegisterNoResponse;
      }
      return null;
    },
    [dispatch]
  );
  return { registerNo: data, status, error, getRegisterNo };
}
