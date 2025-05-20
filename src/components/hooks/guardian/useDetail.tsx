import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchGuardian } from "../../../slices/guardian/detail/thunk";

export function useGuardianShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guardianDetail
  );

  const getGuardian = useCallback(
    async (guardianId: number) => {
      const resultAction = await dispatch(fetchGuardian(guardianId));
      if (fetchGuardian.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { guardian: data, status, error, getGuardian };
}
