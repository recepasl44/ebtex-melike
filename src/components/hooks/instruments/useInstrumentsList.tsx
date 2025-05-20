import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchInstrumentList } from "../../../slices/instruments/list/thunk";
import { Instrument, InstrumentListMeta } from "../../../types/instruments/list";
import { InstrumentsListStatus } from "../../../enums/instruments/list";

export function useInstrumentsList() {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.instrumentsList
    );

    useEffect(() => {
        dispatch(
            fetchInstrumentList({
                searchTerm,
                page,
                paginate: pageSize,
            })
        );
    }, [dispatch, searchTerm, page, pageSize]);

    const loading = status === InstrumentsListStatus.LOADING;
    const instrumentData: Instrument[] = data || [];
    const paginationMeta: InstrumentListMeta | null = meta;

    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        instrumentData,
        loading,
        error,

        page,
        pageSize,
        totalPages,
        totalItems,

        setPage,
        setPageSize,

        searchTerm,
        setSearchTerm,
    };
}