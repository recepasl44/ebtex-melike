import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchInvoiceList } from "../../../slices/invoice/list/thunk";
import { InvoiceListArgs } from "../../../types/invoice/list";
import InvoiceListStatus from "../../../enums/invoice/list";

export function useInvoiceList(params: InvoiceListArgs) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.per_page || 10);
    const { data, links, meta, status, error } = useSelector(
        (state: RootState) => state.invoiceList
    );
    const [filter, setFilter] = useState<any>(null);

    const { enabled, ...otherParams } = params;
    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchInvoiceList({
                enabled: true,
                ...otherParams,
                filter,
            })
        );
    }, [enabled, filter, dispatch, otherParams.level_id, otherParams.branch_id, otherParams.search, otherParams.invoice_filter, otherParams.per_page, otherParams.page]);
    return {
        invoiceData: data || [],
        links,
        meta,
        loading: status === InvoiceListStatus.LOADING,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        totalPages: meta?.last_page || 1,
        totalItems: meta?.total || 0,
    };
}



