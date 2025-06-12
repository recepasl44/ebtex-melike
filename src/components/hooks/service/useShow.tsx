import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchService } from "../../../slices/services/show/thunk";

export function useServiceShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceShow
  );

  const getService = useCallback(
    async (service_id: number) => {
      const resultAction = await dispatch(fetchService(service_id));
      if (fetchService.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { service: data, status, error, getService };
}
