import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchAttendance } from '../../../slices/attendance/detail/thunk'

interface Options {
    attendanceId?: number
    enabled?: boolean
}

export function useAttendanceDetail(options: Options = {}) {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDetail)

    const getAttendance = useCallback(async (attendanceId: number) => {
        const resultAction = await dispatch(fetchAttendance(attendanceId))
        if (fetchAttendance.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    useEffect(() => {
        if (options.enabled && options.attendanceId) {
            dispatch(fetchAttendance(options.attendanceId))
        }
    }, [dispatch, options.attendanceId, options.enabled])

    return { attendance: data, status, error, getAttendance }
}
