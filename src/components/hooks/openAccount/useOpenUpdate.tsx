import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateOpenAccount } from "../../../slices/openAccount/update/thunk";
import { OpenAccountUpdatePayload } from "../../../types/openAccount/update";

export function useOpenUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.openAccountUpdate
  );

  const updateExistingOpenAccount = useCallback(
    async (payload: OpenAccountUpdatePayload) => {
      const resultAction = await dispatch(updateOpenAccount(payload));
      if (updateOpenAccount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );
  return { updatedOpenAccount: data, status, error, updateExistingOpenAccount };
}
