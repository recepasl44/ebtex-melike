import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";

import { fetchSchoolTypes } from "../../../slices/schoolTypes/list/thunk";
import {
    ISchoolType,
    SchoolTypeListArg,
    SchoolTypeListMeta,
} from "../../../types/schoolTypes/list";
import { SchoolTypeListStatus } from "../../../enums/schoolTypes/list";

export function useSchoolTypesList(params: SchoolTypeListArg) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params.page || 1);
    const [paginate, setPaginate] = useState<number>(
        params.paginate ?? params.pageSize ?? 10
    );
    const [filter, setFilter] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.schoolTypesList
    );

    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (params.paginate !== undefined && params.paginate !== paginate) {
            setPaginate(params.paginate);
        }
        if (params.page !== undefined && params.page !== page) {
            setPage(params.page);
        }
    }, [params.paginate, params.page, paginate, page]);

    // veri çek
    useEffect(() => {
        if (!enabled) return;
        dispatch(
            fetchSchoolTypes({
                ...otherParams,
                filter,
                paginate,
                page,
                enabled: false,
            })
        );
    }, [
        enabled,
        filter,
        paginate,
        page,
        dispatch,
        otherParams.someKey,
    ]);

    const loading = status === SchoolTypeListStatus.LOADING;
    const schoolTypesData: ISchoolType[] = data || [];
    const paginationMeta: SchoolTypeListMeta | null = meta;

    return {
        schoolTypesData,
        loading,
        error,

        page,
        paginate,
        totalPages: paginationMeta?.last_page ?? 1,
        totalItems: paginationMeta?.total ?? 0,

        setPage,
        setPaginate,
        setFilter,
        searchTerm,
        setSearchTerm,
    };
}
