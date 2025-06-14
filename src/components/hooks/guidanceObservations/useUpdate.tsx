import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateGuidanceObservation } from "../../../slices/guidanceObservations/update/thunk";
import { GuidanceObservationsUpdatePayload } from "../../../types/guidanceObservations/update";

export function useGuidanceObservationUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceObservationUpdate
  );

  const updateExistingGuidanceObservation = useCallback(
    async (payload: GuidanceObservationsUpdatePayload) => {
      const resultAction = await dispatch(updateGuidanceObservation(payload));
      if (updateGuidanceObservation.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    updatedGuidanceObservation: data,
    status,
    error,
    updateExistingGuidanceObservation,
  };
}
