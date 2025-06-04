import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteDistrict } from "../../../slices/districts/delete/thunk";
export function useDistrictDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.districtDelete);

  const deleteDistrictById = useCallback(
    async (districtId: number) => {
      const resultAction = await dispatch(deleteDistrict(districtId));
      if (deleteDistrict.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedDistrict: data, status, error, deleteDistrictById };
}
