import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addGuidanceObservation } from "../../../slices/guidanceObservations/add/thunk";
import { GuidanceObservationsAddPayload } from "../../../types/guidanceObservations/add";

export function useGuidanceObservationAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.guidanceObservationsAdd
  );

  const addNewGuidanceObservation = useCallback(
    async (payload: GuidanceObservationsAddPayload) => {
      const resultAction = await dispatch(addGuidanceObservation(payload));
      if (addGuidanceObservation.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return {
    addedGuidanceObservation: data,
    status,
    error,
    addNewGuidanceObservation,
  };
}
