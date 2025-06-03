/* src/hooks/group/useList.ts -------------------------------------------------*/
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';

import { fetchGroups } from '../../../slices/group/list/thunk';
import GroupListStatus from '../../../enums/group/list';

import { data as Group, meta as Meta, GroupsListArg } from '../../../types/group/list';

export function useGroupsTable(params: GroupsListArg) {
    const dispatch = useDispatch<AppDispatch>();

    /* --------- lokal pagination state’leri --------- */
    const [page, setPage] = useState<number>(params.page ?? 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize ?? 25);

    /* --------- filtre --------- */
    const [filter, setFilter] = useState<any>(null);

    /* --------- redux state --------- */
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.groupList,
    );

    /* --------- params’in stable kopyası  ---------
       Memoize ederek referans değişimini engelliyoruz.  */
    const stableParams = useMemo(() => {
        const { enabled = true, ...rest } = params;
        return { enabled, ...rest };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [
        /* yalnızca gerçek değişkenleri ekleyin  */
        params.enabled,
        params.group_type_id,
        params.group_name,
        /* ... diğer primitive alanlar ... */
    ]);

    /* --------- veriyi getir --------- */
    useEffect(() => {
        if (stableParams.enabled === false) return;

        dispatch(
            fetchGroups({
                ...stableParams,
                filter,
                page,
                pageSize,
                per_page: pageSize,
            }),
        );
    }, [stableParams, filter, page, pageSize, dispatch]);

    /* --------- geriye dön --------- */
    const loading = status === GroupListStatus.LOADING;
    const groupsData: Group[] = data || [];
    const paginationMeta: Meta | null = meta;

    return {
        /* data */
        groupsData,
        loading,
        error,

        /* pagination */
        page,
        setPage,
        pageSize,
        setPageSize,
        totalPages: paginationMeta ? paginationMeta.last_page : 1,
        totalItems: paginationMeta ? paginationMeta.total : 0,

        /* filter */
        filter,
        setFilter,
    };
}
