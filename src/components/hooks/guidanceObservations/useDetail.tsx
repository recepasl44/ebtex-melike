import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchGuidanceObservation } from "../../../slices/guidanceObservations/detail/thunk";

export function useGuidanceObservationDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceObservationDetail
  );

  const getGuidanceObservation = useCallback(
    async (guidanceObservationId: number) => {
      const resultAction = await dispatch(
        fetchGuidanceObservation(guidanceObservationId)
      );
      if (fetchGuidanceObservation.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { guidanceObservation: data, status, error, getGuidanceObservation };
}
