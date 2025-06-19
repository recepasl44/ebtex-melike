import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { deleteCoaching } from "../../../../slices/employee/coaching/delete/thunk";

export function useCoachingDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.coachingDelete
  );

  const deleteExistingCoaching = useCallback(
    async (coachingId: number) => {
      const result = await dispatch(deleteCoaching(coachingId));
      if (deleteCoaching.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedCoaching: data,
    status,
    error,
    deleteExistingCoaching,
  };
}
