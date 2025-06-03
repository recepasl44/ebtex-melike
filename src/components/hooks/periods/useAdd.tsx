import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addPeriod } from "../../../slices/periods/add/thunk";
import { PeriodsAddPayload } from "../../../types/periods/add";

export function usePeriodAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.periodsAdd
  );

  const addNewPeriod = useCallback(
    async (payload: PeriodsAddPayload) => {
      const resultAction = await dispatch(addPeriod(payload));
      if (addPeriod.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedPeriod: data, status, error, addNewPeriod };
}
