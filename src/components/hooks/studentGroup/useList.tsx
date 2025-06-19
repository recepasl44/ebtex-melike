import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchStudentGroups } from '../../../slices/studentGroup/list/thunk'
import { StudentGroupsListArg, Data, Meta } from '../../../types/studentGroup/list'
import StudentGroupListStatus from '../../../enums/studentGroup/list'

export function useStudentGroupsTable(params: StudentGroupsListArg) {
    const dispatch = useDispatch<AppDispatch>()
    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 25)
    const [filter, setFilter] = useState<any>(null)
    const { data, meta, status, error } = useSelector((state: RootState) => state.studentGroupList)

    useEffect(() => {
        if (params?.enabled === false) return
        const { enabled = true, ...rest } = params
        const query: StudentGroupsListArg = {
            enabled,
            ...rest,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        }
        dispatch(fetchStudentGroups(query))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === StudentGroupListStatus.LOADING
    const studentGroupsData: Data[] = data || []
    const paginationMeta: Meta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

    return {
        studentGroupsData,
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
