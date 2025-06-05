import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteAttendance } from '../../../slices/attendance/delete/thunk'

export function useAttendanceDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDelete)

    const deleteExistingAttendance = useCallback(
        async (attendanceId: number) => {
            const resultAction = await dispatch(deleteAttendance(attendanceId))
            if (deleteAttendance.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedAttendance: data, status, error, deleteExistingAttendance }
}
