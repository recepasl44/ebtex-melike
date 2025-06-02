import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSourceTypes } from '../../../slices/sourceTypes/list/thunk';
import { SourceTypesListArg, SourceTypeData, SourceTypesMeta } from '../../../types/sourceTypes/list';
import SourceTypesListStatus from '../../../enums/sourceTypes/list';

export function useSourceTypesList(params: SourceTypesListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);
    const { data, meta, status, error } = useSelector((state: RootState) => state.sourceTypesList);

    useEffect(() => {
        if (params?.enabled === false) return;
        const { enabled = true, ...restParams } = params;
        const query: SourceTypesListArg = {
            enabled,
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };
        dispatch(fetchSourceTypes(query));
    }, [dispatch, filter, page, pageSize, params]);

    const loading = status === SourceTypesListStatus.LOADING;
    const sourceTypesData: SourceTypeData[] = data || [];
    const paginationMeta: SourceTypesMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        sourceTypesData,
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
