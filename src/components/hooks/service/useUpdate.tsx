import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateService } from "../../../slices/services/update/thunk";
import { ServicesUpdatePayload } from "../../../types/services/update";

export function useServiceUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceUpdate
  );

  const updateExistingService = useCallback(
    async (payload: ServicesUpdatePayload) => {
      const resultAction = await dispatch(updateService(payload));
      if (updateService.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedService: data, status, error, updateExistingService };
}
