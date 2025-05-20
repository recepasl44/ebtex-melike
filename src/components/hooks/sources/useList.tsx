
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSources } from '../../../slices/sources/list/thunk';

import {
    SourcesListArg,
    SourceData,
    SourcesMeta,
} from '../../../types/sources/list';
import SourcesListStatus from '../../../enums/sources/list';

export function useSourcesList(params: SourcesListArg) {
    const dispatch = useDispatch<AppDispatch>();


    const [page, setPage] = useState<number>(params.page ?? 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize ?? 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.sourcesList,
    );

    const enabled = params?.enabled !== false;

    useEffect(() => {
        if (!enabled) return;


        const { enabled: _e, ...restParams } = params;

        const query: SourcesListArg = {
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchSources(query));
    }, [
        enabled,
        dispatch,
        filter,
        page,
        pageSize,
        params.search,
        params.branch_id,
    ]);

    const loading = status === SourcesListStatus.LOADING;
    const sourcesData: SourceData[] = data || [];
    const paginationMeta: SourcesMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        sourcesData,
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
