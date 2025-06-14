import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteService } from "../../../slices/services/delete/thunk";

export function useServiceDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceDelete
  );

  const deleteExistingService = useCallback(
    async (service_id: number) => {
      const resultAction = await dispatch(deleteService(service_id));
      if (deleteService.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedService: data, status, error, deleteExistingService };
}
