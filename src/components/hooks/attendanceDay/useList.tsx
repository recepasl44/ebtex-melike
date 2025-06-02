import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchAttendanceDays } from '../../../slices/attendanceDay/list/thunk'
import { AttendanceDaysListArg, Data, Meta } from '../../../types/attendanceDay/list'
import AttendanceDayListStatus from '../../../enums/attendanceDay/list'

export function useAttendanceDaysTable(params: AttendanceDaysListArg) {
    const dispatch = useDispatch<AppDispatch>()
    const [page, setPage] = useState<number>(params.page || 1)
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 25)
    const [filter, setFilter] = useState<any>(null)
    const { data, meta, status, error } = useSelector((state: RootState) => state.attendanceDayList)

    useEffect(() => {
        if (params?.enabled === false) return
        const { enabled = true, ...rest } = params
        const query: AttendanceDaysListArg = {
            enabled,
            ...rest,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        }
        dispatch(fetchAttendanceDays(query))
    }, [dispatch, filter, page, pageSize, params])

    const loading = status === AttendanceDayListStatus.LOADING
    const attendanceDaysData: Data[] = data || []
    const paginationMeta: Meta | null = meta
    const totalPages = paginationMeta ? paginationMeta.last_page : 1
    const totalItems = paginationMeta ? paginationMeta.total : 0

    return {
        attendanceDaysData,
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
