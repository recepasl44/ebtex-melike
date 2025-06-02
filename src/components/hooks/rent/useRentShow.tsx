import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchRent } from "../../../slices/rent/detail/thunk";

export function useRentShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.rentShow
  );

  const getRent = useCallback(
    async (rentId: number) => {
      const resultAction = await dispatch(fetchRent(rentId));
      if (fetchRent.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { rent: data, status, error, getRent };
}
