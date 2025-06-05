import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteGuardian } from "../../../slices/guardian/delete/thunk";

export function useGuardianDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianDelete
  );

  const deleteExistingGuardian = useCallback(
    async (guardianId: number) => {
      const resultAction = await dispatch(deleteGuardian(guardianId));
      if (deleteGuardian.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedGuardian: data, status, error, deleteExistingGuardian };
}
