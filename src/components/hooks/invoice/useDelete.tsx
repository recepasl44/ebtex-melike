import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteInvoice } from "../../../slices/invoice/delete/thunk";

export function useInvoiceDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.invoiceDelete
    );
    const removeInvoice = useCallback(
        async (id: number) => {
            const result = await dispatch(deleteInvoice(id));
            if (deleteInvoice.fulfilled.match(result)) {
                return result.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { deletedInvoice: data, status, error, removeInvoice };
}
