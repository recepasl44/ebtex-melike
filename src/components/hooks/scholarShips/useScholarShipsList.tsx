
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";

import { fetchScholarships } from "../../../slices/scholarShips/list/thunk";
import {
    IScholarShip,
    ScholarShipListArg,
    ScholarShipListMeta,
} from "../../../types/scholarShips/list";
import { ScholarShipsListStatus } from "../../../enums/scholarShips/list";

export function useScholarShipsList(params: ScholarShipListArg) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.scholarshipList
    );

    const { enabled, ...otherParams } = params;
    useEffect(() => {
        if (!enabled) return;
        dispatch(
            fetchScholarships({
                ...otherParams,
                filter,
                enabled: false,
            })
        );
    }, [enabled, filter, dispatch]);

    const loading = status === ScholarShipsListStatus.LOADING;
    const scholarshipsData: IScholarShip[] = data || [];
    const paginationMeta: ScholarShipListMeta | null = meta;

    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    const refetch = () => {
        dispatch(fetchScholarships({ ...otherParams, filter, enabled: false }));
    };

    return {
        scholarshipsData,
        loading,
        error,

        page,
        pageSize,
        totalPages,
        totalItems,
        refetch,

        setPage,
        setPageSize,
        setFilter,
        searchTerm,
        setSearchTerm,
    };
}
