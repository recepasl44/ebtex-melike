import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchAssignments } from '../../../slices/assignments/list/thunk'
import { AssignmentData, AssignmentListArg, ListMeta } from '../../../types/assignments/list'
import { AssignmentsListStatus } from '../../../enums/assignments/list'

export function useAssignmentsList(params: AssignmentListArg) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.assignmentsList
    );

    /* --- tek bir yerde sorgu oluşturma --- */
    const buildQuery = () => {
        const { enabled, ...restParams } = params;
        return {
            ...restParams,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        } as AssignmentListArg;
    };

    /* --- ilk/filtresiz fetch --- */
    useEffect(() => {
        if (params?.enabled === false) return;
        dispatch(fetchAssignments(buildQuery()));
    }, [dispatch, filter, page, pageSize, params]);

    /* --- refetch fonksiyonu (memoize) --- */
    const refetch = useCallback(() => {
        dispatch(fetchAssignments(buildQuery()));
    }, [dispatch, filter, page, pageSize, params]);      // 🔑

    /* --- çıktı --- */
    const loading = status === AssignmentsListStatus.LOADING;
    const assignmentsData: AssignmentData[] = data || [];
    const paginationMeta: ListMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        assignmentsData,
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
        refetch,                     // 🔥 eklendi
    };
}