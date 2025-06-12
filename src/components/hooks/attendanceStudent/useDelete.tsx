import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteAttendanceStudent } from '../../../slices/attendanceStudent/delete/thunk'

export function useAttendanceStudentDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceStudentDelete)

    const deleteExistingAttendanceStudent = useCallback(
        async (attendanceStudentId: number) => {
            const resultAction = await dispatch(deleteAttendanceStudent(attendanceStudentId))
            if (deleteAttendanceStudent.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedAttendanceStudent: data, status, error, deleteExistingAttendanceStudent }
}
