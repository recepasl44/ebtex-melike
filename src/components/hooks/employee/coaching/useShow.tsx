import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchCoachingDetail } from "../../../../slices/employee/coaching/detail/thunk";

export function useCoachingShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.coachingShow
  );

  const getCoaching = useCallback(
    async (coachingId: number) => {
      const action = await dispatch(fetchCoachingDetail(coachingId));
      if (fetchCoachingDetail.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    coaching: data,
    status,
    error,
    getCoaching,
  };
}
