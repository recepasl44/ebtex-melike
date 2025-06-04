import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addServicetype } from "../../../slices/serviceTypes/add/thunk";
import { ServicetypesAddPayload } from "../../../types/serviceTypes/add";

export function useServiceTypeAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceTypesAdd
  );

  const addNewServicetype = useCallback(
    async (payload: ServicetypesAddPayload) => {
      const resultAction = await dispatch(addServicetype(payload));
      if (addServicetype.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedServicetype: data, status, error, addNewServicetype };
}
