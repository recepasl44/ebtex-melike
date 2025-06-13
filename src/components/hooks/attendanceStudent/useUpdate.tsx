import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateAttendanceStudent } from '../../../slices/attendanceStudent/update/thunk'
import { AttendanceStudentsUpdatePayload } from '../../../types/attendanceStudent/update'

export function useAttendanceStudentUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceStudentUpdate)

    const updateExistingAttendanceStudent = useCallback(
        async (payload: AttendanceStudentsUpdatePayload) => {
            const resultAction = await dispatch(updateAttendanceStudent(payload))
            if (updateAttendanceStudent.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedAttendanceStudent: data, status, error, updateExistingAttendanceStudent }
}
