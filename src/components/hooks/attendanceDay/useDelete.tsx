import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteAttendanceDay } from '../../../slices/attendanceDay/delete/thunk'

export function useAttendanceDayDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceDayDelete)

    const deleteExistingAttendanceDay = useCallback(
        async (attendanceDayId: number) => {
            const resultAction = await dispatch(deleteAttendanceDay(attendanceDayId))
            if (deleteAttendanceDay.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedAttendanceDay: data, status, error, deleteExistingAttendanceDay }
}
