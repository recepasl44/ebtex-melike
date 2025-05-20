import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchGroupTypes } from '../../../slices/grouptype/list/thunk'
import { GroupTypesListArg, data, meta } from '../../../types/grouptype/list'
import GroupTypeListStatus from '../../../enums/grouptype/list'

export function useGroupTypesTable(params: GroupTypesListArg) {
    const dispatch = useDispatch<AppDispatch>()
    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 25)
    const [filter, setFilter] = useState<any>(null)
    const { data, meta, status, error } = useSelector((state: RootState) => state.groupTypeList)

    useEffect(() => {
        if (params?.enabled === false) return
        const { enabled = true, ...rest } = params
        const query: GroupTypesListArg = {
            enabled,
            ...rest,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        }
        dispatch(fetchGroupTypes(query))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === GroupTypeListStatus.LOADING
    const groupTypesData: data[] = data || []
    const paginationMeta: meta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

    return {
        groupTypesData,
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
