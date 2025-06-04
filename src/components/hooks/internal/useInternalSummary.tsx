import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import {
    fetchInternalSummary,
    InternalListArgs,
} from "../../../slices/internal/list/thunk";
import { resetInternalSummaryState } from "../../../slices/internal/list/reducer";
import { InternalListStatus } from "../../../enums/internal/list";

export function useInternalSummary(
    params: InternalListArgs & { enabled?: boolean; pageSize?: number }
) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const {
        data,  // => store.internalAdd.data
        meta,  // => store.internalAdd.meta
        status,
        error,
    } = useSelector((state: RootState) => state.internalAdd as any);

    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchInternalSummary({
                page,
                pageSize,
                ...otherParams,
                filter,
            } as InternalListArgs & { filter: any })
        );

        // Cleanup: parametre değişince de tetiklenir!
        return () => {
            dispatch(resetInternalSummaryState());
        };
    }, [
        dispatch,
        enabled,
        filter,
        page,
        pageSize,
        ...Object.values(otherParams || {}),
    ]);

    const loading = status === InternalListStatus.LOADING;

    // "data" Redux'tan aldığımız ham obje => muhtemelen { data: { ... }, meta: {...} }
    // Uygun isimle export ediyoruz:
    const summaryData = data;  // Tek fark => "data" demek yerine "summaryData" demek

    const paginationMeta = meta || null;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        summaryData, // <-- tablo tarafında bu ismi kullanacağız
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        totalPages,
        totalItems,
    };
}
