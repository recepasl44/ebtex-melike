import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchInvoiceSummary } from "../../../slices/invoice/invoiceSummary/thunk";
import { InvoiceSummaryListArgs } from "../../../types/invoice/invoiceSummary";
import InvoiceSummaryListStatus from "../../../enums/invoice/invoiceSummary";

export function useInvoiceSummaryList(params: InvoiceSummaryListArgs) {
    const dispatch = useDispatch<AppDispatch>();
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.invoiceSummaryList
    );
    const [filter] = useState<any>(null);

    const { enabled, ...otherParams } = params;
    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchInvoiceSummary({
                enabled: true,
                ...otherParams,
                filter,
            })
        );
    }, [enabled, filter, dispatch, otherParams.level_id, otherParams.branch_id, otherParams.first_name, otherParams.per_page, otherParams.page, otherParams.name, otherParams.invoice_filter, otherParams.student_id]);

    const loading = status === InvoiceSummaryListStatus.LOADING;
    const totalPages = meta?.last_page ?? 1;
    const totalItems = meta?.total ?? 0;

    return {
        summaryData: data || [],
        meta,
        loading,
        error,
        totalPages,
        totalItems,
    };
}