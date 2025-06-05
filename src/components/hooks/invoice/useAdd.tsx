import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { addInvoice } from "../../../slices/invoice/add/thunk";
import type { InvoiceAddPayload } from "../../../types/invoice/add";

export function useInvoiceAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.invoiceAdd
    );

    const createInvoice = useCallback(
        (payload: InvoiceAddPayload) => {
            return dispatch(addInvoice(payload));
        },
        [dispatch]
    );

    return {
        createInvoice,
        addedInvoice: data,
        status,
        error,
    };
}
