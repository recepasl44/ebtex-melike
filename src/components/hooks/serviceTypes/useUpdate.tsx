import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateServicetype } from "../../../slices/serviceTypes/update/thunk";
import { ServicetypesUpdatePayload } from "../../../types/serviceTypes/update";

export function useServiceTypeUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceTypesUpdate
  );

  const updateExistingServicetype = useCallback(
    async (payload: ServicetypesUpdatePayload) => {
      const resultAction = await dispatch(updateServicetype(payload));
      if (updateServicetype.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedServicetype: data, status, error, updateExistingServicetype };
}
