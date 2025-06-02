import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateAttendance } from '../../../slices/attendance/update/thunk'
import { AttendancesUpdatePayload } from '../../../types/attendance/update'

export function useAttendanceUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceUpdate)

    const updateExistingAttendance = useCallback(
        async (payload: AttendancesUpdatePayload) => {
            const resultAction = await dispatch(updateAttendance(payload))
            if (updateAttendance.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedAttendance: data, status, error, updateExistingAttendance }
}
