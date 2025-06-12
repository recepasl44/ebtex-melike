import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { addCoaching } from "../../../../slices/employee/coaching/add/thunk";
import { CoachingAddPayload } from "../../../../types/employee/coaching/add";

export function useCoachingAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.coachingAdd
  );

  const addNewCoaching = useCallback(
    async (payload: CoachingAddPayload) => {
      const result = await dispatch(addCoaching(payload));
      if (addCoaching.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedCoaching: data,
    status,
    error,
    addNewCoaching,
  };
}
