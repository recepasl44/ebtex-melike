import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { updateCoaching } from "../../../../slices/employee/coaching/update/thunk";
import { CoachingUpdatePayload } from "../../../../types/employee/coaching/update";

export function useCoachingUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.coachingUpdate
  );

  const updateExistingCoaching = useCallback(
    async (payload: CoachingUpdatePayload) => {
      const result = await dispatch(updateCoaching(payload));
      if (updateCoaching.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedCoaching: data,
    status,
    error,
    updateExistingCoaching,
  };
}
