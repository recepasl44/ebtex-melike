import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchUsers } from '../../../slices/user/list/thunk'
import { UserData, Meta, UsersListArg } from '../../../types/user/list'
import UserListStatus from '../../../enums/user/list'

export function useUsersTable(params: UsersListArg) {
    const dispatch = useDispatch<AppDispatch>()
    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 25)
    const [filter, setFilter] = useState<any>(null)
    const { data, meta, status, error } = useSelector((state: RootState) => state.userList)

    useEffect(() => {
        if (params?.enabled === false) return
        const { enabled = true, ...rest } = params
        const query: UsersListArg = {
            enabled,
            ...rest,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        }
        dispatch(fetchUsers(query))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === UserListStatus.LOADING
    const usersData: UserData[] = data || []
    const paginationMeta: Meta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

    return {
        usersData,
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
    }
}
