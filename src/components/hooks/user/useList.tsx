import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchUsers } from '../../../slices/user/list/thunk';
import { UsersListArg, UserData, Meta } from '../../../types/user/list';
import UserListStatus from '../../../enums/user/list';

export function useUsersTable(params: UsersListArg) {
    const dispatch = useDispatch<AppDispatch>();

    /* page / pageSize local state */
    const [page, setPage] = useState(params.page ?? 1);
    const [pageSize, setPageSize] = useState(params.pageSize ?? 25);
    const [filter, setFilter] = useState<any>(null);

    /* redux store slice */
    const { data, meta, status, error } = useSelector(
        (s: RootState) => s.userList,
    );

    /* ---- parametreleri ayıkla ---- */
    const {
        enabled = true,
        role_id,
        search,
        // başka filtre alanlarınız varsa ekleyin
    } = params;

    /* ---- server query ---- */
    const query: UsersListArg = useMemo(
        () => ({
            enabled: true,
            role_id,
            search,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        }),
        [role_id, search, filter, page, pageSize],
    );

    /* ---- fetch ---- */
    useEffect(() => {
        if (!enabled) return;
        dispatch(fetchUsers(query));
    }, [enabled, query, dispatch]);     // <– query reference sadece
    //    ilgili primitive’ler değiştiğinde yenilenir

    /* ---- sonuçlar ---- */
    const loading = status === UserListStatus.LOADING;
    const usersData: UserData[] = data || [];
    const paginationMeta: Meta | null = meta;

    return {
        usersData,
        loading,
        error,
        page, setPage,
        pageSize, setPageSize,
        filter, setFilter,
        totalPages: paginationMeta ? paginationMeta.last_page : 1,
        totalItems: paginationMeta ? paginationMeta.total : 0,
    };
}
