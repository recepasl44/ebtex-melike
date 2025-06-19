import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchSupplierShow } from "../../../slices/suppliers/supplier/show/thunk";

export function useSupplierShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.supplierShow
  );

  const getSupplier = useCallback(
    async (supplierId: string) => {
      const id = Number(supplierId);
      const resultAction = await dispatch(fetchSupplierShow(String(id)));
      if (fetchSupplierShow.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { supplier: data, status, error, getSupplier };
}
