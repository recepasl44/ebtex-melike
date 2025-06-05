import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchInvoiceDetail } from "../../../slices/invoice/detail/thunk";

export function useInvoiceDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.invoiceDetail
    );
    const getInvoice = useCallback(
        async (id: number) => {
            const result = await dispatch(fetchInvoiceDetail(id));
            if (fetchInvoiceDetail.fulfilled.match(result)) {
                return result.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { invoice: data, status, error, getInvoice };
}
