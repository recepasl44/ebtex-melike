import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchAttendanceDay } from '../../../slices/attendanceDay/detail/thunk'

export function useAttendanceDayDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDayDetail)

    const getAttendanceDay = useCallback(async (attendanceDayId: number) => {
        const resultAction = await dispatch(fetchAttendanceDay(attendanceDayId))
        if (fetchAttendanceDay.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { attendanceDay: data, status, error, getAttendanceDay }
}
