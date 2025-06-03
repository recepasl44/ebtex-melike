import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { addTuitionFees } from "../../../../slices/employee/tuition_fees/add/thunk";
import { TuitionFeesAddPayload } from "../../../../types/employee/tuition_fees/add";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

export function useTuitionFeesAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.tuitionFeesAdd
  );

  const addNewTuitionFees = useCallback(
    async (payload: TuitionFeesAddPayload) => {
      const action = await dispatch(addTuitionFees(payload));
      if (addTuitionFees.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === TuitionFeesListStatus.LOADING;

  return {
    addedTuitionFees: data,
    loading,
    error,
    addNewTuitionFees,
  };
}
