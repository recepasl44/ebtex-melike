import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addSupplier } from "../../../slices/suppliers/supplier/add/thunk";
import { SupplierAddPayload } from "../../../types/suppliers/supplier/add";

export function useSupplierAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.supplierAdd
  );

  const addNewSupplier = useCallback(
    async (payload: SupplierAddPayload) => {
      const resultAction = await dispatch(addSupplier(payload));
      if (addSupplier.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedSupplier: data, status, error, addNewSupplier };
}
