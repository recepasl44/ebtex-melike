import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addOpenAccount } from "../../../slices/openAccount/add/thunk";
import { OpenAccountAddPayload } from "../../../types/openAccount/add";

export function useOpenAccountAdd() {
  const dispatch = useDispatch<AppDispatch>();

  const openAccountAddState =
    useSelector((state: RootState) => state.openAccountAdd) || {};
  const { data, status, error } = openAccountAddState;

  const addNewOpenAccount = useCallback(
    async (payload: OpenAccountAddPayload) => {
      const resultAction = await dispatch(addOpenAccount(payload));
      if (addOpenAccount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedOpenAccount: data,
    status,
    error,
    addNewOpenAccount,
  };
}
