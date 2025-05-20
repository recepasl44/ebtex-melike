import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchAttendance } from '../../../slices/attendance/detail/thunk'

export function useAttendanceDetail(p0: { attendanceId: number; enabled: boolean }) {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDetail)

    const getAttendance = useCallback(async (attendanceId: number) => {
        const resultAction = await dispatch(fetchAttendance(attendanceId))
        if (fetchAttendance.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { attendance: data, status, error, getAttendance }
}
