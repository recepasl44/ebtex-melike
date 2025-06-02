import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateGuardian } from "../../../slices/guardian/update/thunk";
import { GuardiansUpdatePayload } from "../../../types/guardian/update";

export function useGuardianUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianUpdate
  );

  const updateExistingGuardian = useCallback(
    async (payload: GuardiansUpdatePayload) => {
      const resultAction = await dispatch(updateGuardian(payload));
      if (updateGuardian.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedGuardian: data, status, error, updateExistingGuardian };
}
