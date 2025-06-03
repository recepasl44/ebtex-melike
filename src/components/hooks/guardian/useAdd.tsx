import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addGuardian } from "../../../slices/guardian/add/thunk";
import { GuardiansAddPayload } from "../../../types/guardian/add";

export function useGuardianAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianAdd
  );

  const addNewGuardian = useCallback(
    async (payload: GuardiansAddPayload) => {
      const resultAction = await dispatch(addGuardian(payload));
      if (addGuardian.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedGuardian: data, status, error, addNewGuardian };
}
