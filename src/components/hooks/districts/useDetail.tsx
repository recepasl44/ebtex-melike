import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { showDistrict } from "../../../slices/districts/show/thunk";

export function useDiscrictDetail(p0: { districtId: number; payload: { name: string; }; }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.districtShow
  );

  const getDistrict = useCallback(
    async (districtId: number) => {
      const resultAction = await dispatch(showDistrict(districtId));
      if (showDistrict.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { district: data, status, error, getDistrict };
}
