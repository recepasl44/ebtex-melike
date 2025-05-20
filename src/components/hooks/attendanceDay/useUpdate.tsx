import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateAttendanceDay } from '../../../slices/attendanceDay/update/thunk'
import { AttendanceDaysUpdatePayload } from '../../../types/attendanceDay/update'

export function useAttendanceDayUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDayUpdate)

    const updateExistingAttendanceDay = useCallback(
        async (payload: AttendanceDaysUpdatePayload) => {
            const resultAction = await dispatch(updateAttendanceDay(payload))
            if (updateAttendanceDay.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedAttendanceDay: data, status, error, updateExistingAttendanceDay }
}
