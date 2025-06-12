import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteGuidanceObservation } from "../../../slices/guidanceObservations/delete/thunk";

export function useGuidanceObservationDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceObservationDelete
  );

  const deleteExistingGuidanceObservation = useCallback(
    async (guidanceObservationId: number) => {
      const resultAction = await dispatch(
        deleteGuidanceObservation(guidanceObservationId)
      );
      if (deleteGuidanceObservation.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    deletedGuidanceObservation: data,
    status,
    error,
    deleteExistingGuidanceObservation,
  };
}
