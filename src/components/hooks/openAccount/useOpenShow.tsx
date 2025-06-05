import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchOpenAccount } from "../../../slices/openAccount/detail/thunk";

export function useOpenShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.openAccountShow
  );

  const getOpenAccount = useCallback(
    async (openAccountId: number) => {
      const resultAction = await dispatch(fetchOpenAccount(openAccountId));
      if (fetchOpenAccount.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { openAccount: data, status, error, getOpenAccount };
}
