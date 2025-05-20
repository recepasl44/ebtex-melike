import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteSupplier } from "../../../slices/suppliers/supplier/delete/thunk";

export function useSupplierDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.supplierDelete
  );

  const removeSupplier = useCallback(
    async (supplierId: number) => {
      const resultAction = await dispatch(deleteSupplier(supplierId));
      if (deleteSupplier.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedSupplierId: data, status, error, removeSupplier };
}
