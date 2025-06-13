import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addAttendanceDay } from '../../../slices/attendanceDay/add/thunk'
import { AttendanceDaysAddPayload } from '../../../types/attendanceDay/add'

export function useAttendanceDayAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDayAdd)

    const addNewAttendanceDay = useCallback(
        async (payload: AttendanceDaysAddPayload) => {
            const resultAction = await dispatch(addAttendanceDay(payload))
            if (addAttendanceDay.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedAttendanceDay: data, status, error, addNewAttendanceDay }
}
