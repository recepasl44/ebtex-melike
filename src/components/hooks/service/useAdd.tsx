import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addService } from "../../../slices/services/add/thunk";
import { ServicesAddPayload } from "../../../types/services/add";

export function useServiceAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceAdd
  );

  const addNewService = useCallback(
    async (payload: ServicesAddPayload) => {
      const resultAction = await dispatch(addService(payload));
      if (addService.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedService: data, status, error, addNewService };
}
