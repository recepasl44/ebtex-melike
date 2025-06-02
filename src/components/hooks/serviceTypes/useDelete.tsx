import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteServicetype } from "../../../slices/serviceTypes/delete/thunk";

export function useServiceTypeDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceTypesDelete
  );

  const deleteExistingServicetype = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(deleteServicetype(id));
      if (deleteServicetype.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedServicetype: data, status, error, deleteExistingServicetype };
}
