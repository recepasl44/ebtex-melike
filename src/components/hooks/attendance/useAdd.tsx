import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addAttendance } from '../../../slices/attendance/add/thunk'
import { AttendancesAddPayload } from '../../../types/attendance/add'

export function useAttendanceAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceAdd)

    const addNewAttendance = useCallback(
        async (payload: AttendancesAddPayload) => {
            const resultAction = await dispatch(addAttendance(payload))
            if (addAttendance.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedAttendance: data, status, error, addNewAttendance }
}
