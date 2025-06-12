import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateInvoice } from "../../../slices/invoice/update/thunk";
import { InvoiceUpdatePayload } from "../../../types/invoice/update";

export function useInvoiceUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.invoiceUpdate
    );
    const editInvoice = useCallback(
        async (payload: InvoiceUpdatePayload) => {
            const result = await dispatch(updateInvoice(payload));
            if (updateInvoice.fulfilled.match(result)) {
                return result.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { updatedInvoice: data, status, error, editInvoice };
}
