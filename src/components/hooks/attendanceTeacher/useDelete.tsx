import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteAttendanceTeacher } from '../../../slices/attendanceTeacher/delete/thunk'

export function useAttendanceTeacherDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceTeacherDelete)

    const deleteExistingAttendanceTeacher = useCallback(
        async (attendanceTeacherId: number) => {
            const resultAction = await dispatch(deleteAttendanceTeacher(attendanceTeacherId))
            if (deleteAttendanceTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedAttendanceTeacher: data, status, error, deleteExistingAttendanceTeacher }
}
