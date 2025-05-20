import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchServicetype } from "../../../slices/serviceTypes/detail/thunk";

export function useServiceTypeDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.serviceTypesDetail
  );

  const getServicetype = useCallback(
    async (id: number) => {
      const resultAction = await dispatch(fetchServicetype(id));
      if (fetchServicetype.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { servicetype: data, status, error, getServicetype };
}
