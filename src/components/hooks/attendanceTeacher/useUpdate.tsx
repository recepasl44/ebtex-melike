import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateAttendanceTeacher } from '../../../slices/attendanceTeacher/update/thunk'
import { AttendanceTeachersUpdatePayload } from '../../../types/attendanceTeacher/update'

export function useAttendanceTeacherUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceTeacherUpdate)

    const updateExistingAttendanceTeacher = useCallback(
        async (payload: AttendanceTeachersUpdatePayload) => {
            const resultAction = await dispatch(updateAttendanceTeacher(payload))
            if (updateAttendanceTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedAttendanceTeacher: data, status, error, updateExistingAttendanceTeacher }
}
